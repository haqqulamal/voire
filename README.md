# VOIRE

VOIRE adalah proyek fashion e-commerce dengan frontend React TypeScript dan backend Laravel REST API.

Frontend berjalan di `http://localhost:5173` dan Laravel API berjalan di `http://localhost:8000/api`.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Zustand
- Axios
- Laravel 10 REST API
- Laravel Sanctum
- MySQL
- Midtrans Snap

## Struktur Proyek

```text
voire/
+-- src/                  # React frontend
|   +-- api/              # Axios instance dan API calls
|   +-- components/       # Komponen UI hasil Stitch + reusable states
|   +-- layouts/          # MainLayout dan AdminLayout
|   +-- pages/            # Route page containers
|   +-- store/            # Zustand auth/cart stores
|   +-- types/            # TypeScript interfaces API
+-- voire-api/            # Laravel backend REST API
+-- tailwind.config.js
+-- postcss.config.js
+-- package.json
```

## Prasyarat

- Node.js
- PHP 8.1+
- Composer
- MySQL atau XAMPP MySQL

## Environment Frontend

Buat atau cek file `.env` di root proyek:

```env
VITE_API_URL=http://localhost:8000/api
VITE_MIDTRANS_CLIENT_KEY=your_client_key
```

## Environment Backend

Cek file `voire-api/.env`:

```env
APP_NAME="VOIRE API"
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=voire_db
DB_USERNAME=root
DB_PASSWORD=

MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false
```

## Instalasi

Install dependency frontend:

```bash
npm install
```

Install dependency backend:

```bash
cd voire-api
composer install
php artisan key:generate
```

Pastikan database `voire_db` sudah ada, lalu jalankan migrasi dan seeder:

```bash
php artisan migrate:fresh --seed
```

Seeder membuat:

- Admin: `admin@voire.com` / `password`
- Customer: `customer@voire.com` / `password`
- 5 kategori
- 20 produk fashion

## Menjalankan Aplikasi

Terminal 1, jalankan backend:

```bash
cd voire-api
php artisan serve --host=127.0.0.1 --port=8000
```

Terminal 2, jalankan frontend:

```bash
npm run dev
```

Buka:

```text
http://localhost:5173
```

## Route Frontend

Public:

- `/`
- `/products`
- `/products/:slug`
- `/login`
- `/register`

Butuh login:

- `/cart`
- `/checkout`
- `/orders`
- `/orders/:orderNumber`
- `/orders/:orderNumber/success`

Admin only:

- `/admin/dashboard`
- `/admin/products`
- `/admin/orders`

## Endpoint API Utama

Public:

- `POST /api/register`
- `POST /api/login`
- `GET /api/products`
- `GET /api/products/{slug}`
- `GET /api/categories`

Authenticated:

- `POST /api/logout`
- `GET /api/me`
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/{id}`
- `DELETE /api/cart/{id}`
- `DELETE /api/cart`
- `POST /api/checkout`
- `POST /api/payment/{orderNumber}/snap-token`
- `GET /api/orders`
- `GET /api/orders/{orderNumber}`

Admin:

- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/{id}/status`

Webhook Midtrans:

- `POST /api/payment/callback`

## Format Response API

Success:

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

Error:

```json
{
  "success": false,
  "message": "...",
  "errors": {}
}
```

Paginated:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 20
  }
}
```

## Catatan Checkout dan Midtrans

Checkout frontend akan:

1. Membuat order melalui `/api/checkout`.
2. Mengambil `snap_token` melalui `/api/payment/{orderNumber}/snap-token`.
3. Memuat script sandbox Midtrans.
4. Memanggil `window.snap.pay(...)`.
5. Mengarahkan ke `/orders/:orderNumber/success` saat pembayaran sukses.

Saat ini checkout memakai `address_id: 1`, sesuai alamat seed customer. Untuk user baru, backend perlu ditambah endpoint address create/list agar checkout bisa memilih alamat milik user tersebut.

## Verifikasi

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
cd voire-api
php artisan test
php artisan route:list --path=api
```
