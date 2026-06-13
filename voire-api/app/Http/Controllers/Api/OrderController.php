<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('payment')
            ->latest()
            ->paginate(10);

        return $this->paginated($orders, 'Orders retrieved successfully');
    }

    public function show(Request $request, string $orderNumber)
    {
        $order = $request->user()
            ->orders()
            ->with('items.product', 'address', 'payment')
            ->where('order_number', $orderNumber)
            ->first();

        if (! $order) {
            return $this->error('Order not found', [], 404);
        }

        return $this->success($order, 'Order retrieved successfully');
    }
}
