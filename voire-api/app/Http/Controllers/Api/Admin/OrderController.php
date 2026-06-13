<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('user', 'payment', 'items.product');

        $query->when($request->filled('search'), function ($query) use ($request) {
            $search = $request->string('search')->toString();
            $query->where(function ($query) use ($search) {
                $query->where('order_number', 'like', "%{$search}%")
                    ->orWhereHas('user', fn ($query) => $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%"));
            });
        });

        $query->when($request->filled('status'), function ($query) use ($request) {
            $query->where('status', $request->string('status')->toString());
        });

        return $this->paginated($query->latest()->paginate(12), 'Orders retrieved successfully');
    }

    public function updateStatus(Request $request, int $id)
    {
        $data = $request->validate([
            'status' => ['required', Rule::in(array_column(OrderStatus::cases(), 'value'))],
        ]);

        $order = Order::find($id);

        if (! $order) {
            return $this->error('Order not found', [], 404);
        }

        $order->update(['status' => $data['status']]);

        return $this->success($order->fresh('user', 'payment'), 'Order status updated successfully');
    }
}
