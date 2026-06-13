<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return $this->success(
            Category::orderBy('name')->get(),
            'Categories retrieved successfully'
        );
    }
}
