<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $items = $request->user()
            ->cartItems()
            ->with('product.category')
            ->latest()
            ->get();

        return $this->success($items, 'Cart items retrieved successfully');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'size' => ['required', 'string', 'max:50'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::where('id', $data['product_id'])->where('is_active', true)->first();

        if (! $product) {
            return $this->error('Product is not available', [], 422);
        }

        if (! in_array($data['size'], $product->sizes ?? [], true)) {
            return $this->error('Selected size is not available for this product', [], 422);
        }

        $item = CartItem::firstOrNew([
            'user_id' => $request->user()->id,
            'product_id' => $data['product_id'],
            'size' => $data['size'],
        ]);

        $item->quantity = ($item->exists ? $item->quantity : 0) + $data['quantity'];
        $item->save();

        return $this->success($item->load('product.category'), 'Cart item saved successfully', 201);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $item = $request->user()->cartItems()->whereKey($id)->first();

        if (! $item) {
            return $this->error('Cart item not found', [], 404);
        }

        $item->update(['quantity' => $data['quantity']]);

        return $this->success($item->load('product.category'), 'Cart item updated successfully');
    }

    public function destroy(Request $request, int $id)
    {
        $item = $request->user()->cartItems()->whereKey($id)->first();

        if (! $item) {
            return $this->error('Cart item not found', [], 404);
        }

        $item->delete();

        return $this->success(null, 'Cart item removed successfully');
    }

    public function clear(Request $request)
    {
        $request->user()->cartItems()->delete();

        return $this->success(null, 'Cart cleared successfully');
    }
}
