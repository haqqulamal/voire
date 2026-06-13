<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\PaymentStatus;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $start = now()->subDays(6)->startOfDay();
        $weeklyPayments = Payment::query()
            ->where('status', PaymentStatus::Success->value)
            ->where('paid_at', '>=', $start)
            ->selectRaw('DATE(paid_at) as date, SUM(amount) as revenue')
            ->groupBy('date')
            ->pluck('revenue', 'date');

        $weeklyRevenue = collect(range(0, 6))->map(function ($offset) use ($weeklyPayments, $start) {
            $date = $start->copy()->addDays($offset)->toDateString();

            return [
                'date' => $date,
                'revenue' => (float) ($weeklyPayments[$date] ?? 0),
            ];
        });

        return $this->success([
            'total_revenue' => (float) Payment::where('status', PaymentStatus::Success->value)->sum('amount'),
            'orders_today' => Order::whereDate('created_at', Carbon::today())->count(),
            'total_products' => Product::count(),
            'total_customers' => User::where('role', UserRole::Customer->value)->count(),
            'weekly_revenue' => $weeklyRevenue,
            'recent_orders' => Order::with('user', 'payment')->latest()->limit(10)->get(),
        ], 'Dashboard stats retrieved successfully');
    }
}
