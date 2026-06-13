<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@voire.com'],
            [
                'name' => 'VOIRE Admin',
                'password' => Hash::make('password'),
                'role' => UserRole::Admin->value,
            ]
        );

        $customer = User::updateOrCreate(
            ['email' => 'customer@voire.com'],
            [
                'name' => 'VOIRE Customer',
                'password' => Hash::make('password'),
                'role' => UserRole::Customer->value,
            ]
        );

        $customer->addresses()->updateOrCreate(
            ['recipient_name' => 'VOIRE Customer', 'postal_code' => '12190'],
            [
                'phone' => '081234567890',
                'address' => 'Jl. Senopati No. 12',
                'city' => 'Jakarta Selatan',
                'province' => 'DKI Jakarta',
                'is_default' => true,
            ]
        );

        $categories = collect([
            ['name' => 'Tops', 'image' => '/images/categories/tops.jpg'],
            ['name' => 'Bottoms', 'image' => '/images/categories/bottoms.jpg'],
            ['name' => 'Outerwear', 'image' => '/images/categories/outerwear.jpg'],
            ['name' => 'Dresses', 'image' => '/images/categories/dresses.jpg'],
            ['name' => 'Accessories', 'image' => '/images/categories/accessories.jpg'],
        ])->mapWithKeys(function (array $category) {
            $model = Category::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                $category + ['slug' => Str::slug($category['name'])]
            );

            return [$model->name => $model];
        });

        $products = [
            ['Tops', 'Lumiere Satin Blouse', 375000, 'A fluid satin blouse with a soft drape and pearl-finish buttons.'],
            ['Tops', 'Mira Rib Knit Tank', 225000, 'A fitted rib knit tank made for clean everyday layering.'],
            ['Tops', 'Aveline Cotton Shirt', 425000, 'A crisp oversized cotton shirt with dropped shoulders.'],
            ['Tops', 'Noir Asymmetric Top', 520000, 'An asymmetric evening top with a sculpted neckline.'],
            ['Bottoms', 'Selene Wide Leg Trousers', 695000, 'Tailored wide leg trousers with a flattering high waist.'],
            ['Bottoms', 'Celine Pleated Skirt', 585000, 'A midi pleated skirt with soft movement and a polished finish.'],
            ['Bottoms', 'Aria Straight Denim', 650000, 'Structured straight-leg denim in a deep indigo wash.'],
            ['Bottoms', 'Vera Linen Shorts', 315000, 'Lightweight linen shorts with a relaxed summer fit.'],
            ['Outerwear', 'Marcel Trench Coat', 1850000, 'A water-resistant trench coat with classic storm flap detailing.'],
            ['Outerwear', 'Elodie Cropped Blazer', 1250000, 'A cropped blazer with sharp lapels and a modern silhouette.'],
            ['Outerwear', 'Raine Quilted Jacket', 975000, 'A lightweight quilted jacket with subtle diamond stitching.'],
            ['Outerwear', 'Nadia Wool Blend Coat', 2450000, 'A warm wool blend coat with a clean single-breasted front.'],
            ['Dresses', 'Amara Slip Dress', 890000, 'A bias-cut slip dress with an elegant satin sheen.'],
            ['Dresses', 'Isla Wrap Midi Dress', 765000, 'A wrap midi dress designed for an adjustable, feminine fit.'],
            ['Dresses', 'Florence Knit Dress', 830000, 'A soft knit dress with long sleeves and a streamlined profile.'],
            ['Dresses', 'Lucia Evening Gown', 2350000, 'A floor-length gown with refined draping for formal occasions.'],
            ['Accessories', 'Aurelia Silk Scarf', 295000, 'A printed silk scarf that adds color to everyday styling.'],
            ['Accessories', 'Camille Leather Belt', 350000, 'A slim leather belt with brushed gold hardware.'],
            ['Accessories', 'Esme Mini Shoulder Bag', 1450000, 'A compact shoulder bag with structured leather panels.'],
            ['Accessories', 'Solene Pearl Earrings', 275000, 'Minimal pearl earrings for day-to-night wear.'],
        ];

        foreach ($products as [$categoryName, $name, $price, $description]) {
            $isAccessory = $categoryName === 'Accessories';

            Product::updateOrCreate(
                ['slug' => Str::slug($name)],
                [
                    'category_id' => $categories[$categoryName]->id,
                    'name' => $name,
                    'slug' => Str::slug($name),
                    'description' => $description,
                    'price' => $price,
                    'sizes' => $isAccessory ? ['ONE SIZE'] : ['XS', 'S', 'M', 'L', 'XL'],
                    'images' => [
                        '/images/products/' . Str::slug($name) . '-1.jpg',
                        '/images/products/' . Str::slug($name) . '-2.jpg',
                    ],
                    'stock' => fake()->numberBetween(12, 60),
                    'is_active' => true,
                ]
            );
        }
    }
}
