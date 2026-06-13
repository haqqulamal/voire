<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        $query->when($request->filled('search'), function ($query) use ($request) {
            $search = $request->string('search')->toString();
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        });

        $query->when($request->filled('category_id'), function ($query) use ($request) {
            $query->where('category_id', $request->integer('category_id'));
        });

        return $this->paginated($query->latest()->paginate(12), 'Products retrieved successfully');
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['images'] = $this->resolveImages($request);

        $product = Product::create($data);

        return $this->success($product->load('category'), 'Product created successfully', 201);
    }

    public function show(int $id)
    {
        $product = Product::with('category')->find($id);

        if (! $product) {
            return $this->error('Product not found', [], 404);
        }

        return $this->success($product, 'Product retrieved successfully');
    }

    public function update(Request $request, int $id)
    {
        $product = Product::find($id);

        if (! $product) {
            return $this->error('Product not found', [], 404);
        }

        $data = $this->validatedData($request, $product->id, true);

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        if ($request->has('images')) {
            $data['images'] = $this->resolveImages($request);
        }

        $product->update($data);

        return $this->success($product->fresh('category'), 'Product updated successfully');
    }

    public function destroy(int $id)
    {
        $product = Product::find($id);

        if (! $product) {
            return $this->error('Product not found', [], 404);
        }

        $product->delete();

        return $this->success(null, 'Product deleted successfully');
    }

    private function validatedData(Request $request, ?int $productId = null, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'category_id' => [$required, 'exists:categories,id'],
            'name' => [$required, 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($productId)],
            'description' => [$required, 'string'],
            'price' => [$required, 'numeric', 'min:0'],
            'sizes' => [$required, 'array', 'min:1'],
            'sizes.*' => ['string', 'max:50'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable'],
            'stock' => [$required, 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }

    private function resolveImages(Request $request): array
    {
        $images = [];

        foreach ($request->file('images', []) as $image) {
            $images[] = Storage::url($image->store('products', 'public'));
        }

        foreach ($request->input('images', []) as $image) {
            if (is_string($image) && $image !== '') {
                $images[] = $image;
            }
        }

        return $images;
    }
}
