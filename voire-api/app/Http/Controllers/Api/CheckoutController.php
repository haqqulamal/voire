<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'address_id' => ['required', 'exists:addresses,id'],
            'notes' => ['nullable', 'string'],
        ]);

        $address = Address::where('user_id', $request->user()->id)->whereKey($data['address_id'])->first();

        if (! $address) {
            return $this->error('Address not found', [], 404);
        }

        $cartItems = $request->user()->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return $this->error('Cart is empty', [], 422);
        }

        $order = DB::transaction(function () use ($request, $data, $cartItems, $address) {
            $subtotal = 0;

            foreach ($cartItems as $item) {
                if (! $item->product || ! $item->product->is_active) {
                    abort(422, 'One or more products are no longer available.');
                }

                if ($item->quantity > $item->product->stock) {
                    abort(422, "{$item->product->name} does not have enough stock.");
                }

                $subtotal += $item->product->price * $item->quantity;
            }

            $shippingCost = 0;
            $total = $subtotal + $shippingCost;

            $order = Order::create([
                'user_id' => $request->user()->id,
                'address_id' => $address->id,
                'order_number' => $this->makeOrderNumber(),
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'status' => OrderStatus::Pending->value,
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($cartItems as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'size' => $item->size,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            $order->payment()->create([
                'midtrans_order_id' => $order->order_number,
                'amount' => $total,
                'status' => PaymentStatus::Pending->value,
            ]);

            $request->user()->cartItems()->delete();

            return $order->load('items.product', 'address', 'payment');
        });

        return $this->success($order, 'Order created successfully', 201);
    }

    private function makeOrderNumber(): string
    {
        do {
            $number = 'VOIRE-' . now()->format('YmdHis') . '-' . random_int(1000, 9999);
        } while (Order::where('order_number', $number)->exists());

        return $number;
    }
}
