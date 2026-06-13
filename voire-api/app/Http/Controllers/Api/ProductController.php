<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->with('category')
            ->where('is_active', true);

        $query->when($request->filled('category_id'), function ($query) use ($request) {
            $query->where('category_id', $request->integer('category_id'));
        });

        $query->when($request->filled('size'), function ($query) use ($request) {
            $query->whereJsonContains('sizes', $request->string('size')->toString());
        });

        $query->when($request->filled('min_price'), function ($query) use ($request) {
            $query->where('price', '>=', $request->input('min_price'));
        });

        $query->when($request->filled('max_price'), function ($query) use ($request) {
            $query->where('price', '<=', $request->input('max_price'));
        });

        match ($request->input('sort')) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'name_asc' => $query->orderBy('name'),
            'name_desc' => $query->orderByDesc('name'),
            default => $query->latest(),
        };

        return $this->paginated($query->paginate(12), 'Products retrieved successfully');
    }

    public function show(string $slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (! $product) {
            return $this->error('Product not found', [], 404);
        }

        return $this->success($product, 'Product retrieved successfully');
    }
}
