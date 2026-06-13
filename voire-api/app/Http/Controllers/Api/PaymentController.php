<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;

class PaymentController extends Controller
{
    public function getSnapToken(Request $request, string $orderNumber)
    {
        $order = $request->user()
            ->orders()
            ->with('items.product', 'user', 'address', 'payment')
            ->where('order_number', $orderNumber)
            ->first();

        if (! $order) {
            return $this->error('Order not found', [], 404);
        }

        $this->configureMidtrans();

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => (int) $order->total,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->address->phone,
                'shipping_address' => [
                    'first_name' => $order->address->recipient_name,
                    'phone' => $order->address->phone,
                    'address' => $order->address->address,
                    'city' => $order->address->city,
                    'postal_code' => $order->address->postal_code,
                    'country_code' => 'IDN',
                ],
            ],
            'item_details' => $order->items->map(fn ($item) => [
                'id' => (string) $item->product_id,
                'price' => (int) $item->price,
                'quantity' => $item->quantity,
                'name' => substr($item->product->name . ' - ' . $item->size, 0, 50),
            ])->values()->all(),
        ];

        $snapToken = Snap::getSnapToken($params);

        $payment = $order->payment ?: new Payment([
            'midtrans_order_id' => $order->order_number,
            'amount' => $order->total,
            'status' => PaymentStatus::Pending->value,
        ]);

        $payment->fill([
            'snap_token' => $snapToken,
            'midtrans_order_id' => $order->order_number,
            'amount' => $order->total,
        ]);

        $order->payment()->save($payment);

        return $this->success([
            'snap_token' => $snapToken,
            'client_key' => config('services.midtrans.client_key'),
        ], 'Snap token generated successfully');
    }

    public function callback(Request $request)
    {
        $orderId = $request->input('order_id');
        $transactionStatus = $request->input('transaction_status');
        $fraudStatus = $request->input('fraud_status');

        $order = Order::where('order_number', $orderId)->first();

        if (! $order) {
            return $this->error('Order not found', [], 404);
        }

        $paymentStatus = match ($transactionStatus) {
            'capture' => $fraudStatus === 'challenge' ? PaymentStatus::Pending : PaymentStatus::Success,
            'settlement' => PaymentStatus::Success,
            'deny', 'cancel' => PaymentStatus::Failed,
            'expire' => PaymentStatus::Expired,
            default => PaymentStatus::Pending,
        };

        $payment = $order->payment ?: new Payment([
            'midtrans_order_id' => $order->order_number,
            'amount' => $request->input('gross_amount', $order->total),
        ]);

        $payment->fill([
            'midtrans_order_id' => $orderId,
            'payment_type' => $request->input('payment_type'),
            'amount' => $request->input('gross_amount', $order->total),
            'status' => $paymentStatus->value,
            'paid_at' => $paymentStatus === PaymentStatus::Success ? now() : $payment->paid_at,
        ]);

        $order->payment()->save($payment);

        if ($paymentStatus === PaymentStatus::Success && $order->status === OrderStatus::Pending) {
            $order->update(['status' => OrderStatus::Processing->value]);
        }

        if (in_array($paymentStatus, [PaymentStatus::Failed, PaymentStatus::Expired], true)) {
            $order->update(['status' => OrderStatus::Cancelled->value]);
        }

        return $this->success($payment->fresh(), 'Payment callback processed successfully');
    }

    private function configureMidtrans(): void
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = (bool) config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }
}
