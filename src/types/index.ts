export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  category_id: number;
  category?: Category;
  name: string;
  slug: string;
  description: string;
  price: string;
  sizes: string[];
  images: string[];
  stock: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Address {
  id: number;
  user_id: number;
  recipient_name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  product: Product;
  size: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'expired';

export interface Order {
  id: number;
  user_id: number;
  address_id: number;
  user?: User;
  address?: Address;
  items?: OrderItem[];
  payment?: Payment | null;
  order_number: string;
  subtotal: string;
  shipping_cost: string;
  total: string;
  status: OrderStatus;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product?: Product;
  size: string;
  quantity: number;
  price: string;
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id: number;
  order_id: number;
  midtrans_order_id: string;
  snap_token: string | null;
  payment_type: string | null;
  amount: string;
  status: PaymentStatus;
  paid_at: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LegacyProduct {
  id: string;
  apiId?: number;
  slug?: string;
  name: string;
  price: number;
  category: string;
  primaryImage: string;
  secondaryImage: string;
  description: string;
  sizes: string[];
  details: string[];
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured?: boolean;
}

export interface LegacyCartItem {
  id: string;
  apiId: number;
  product: LegacyProduct;
  selectedSize: string;
  quantity: number;
}

export interface LegacyOrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface LegacyOrder {
  id: string;
  apiId?: number;
  date: string;
  items: LegacyOrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: ShippingAddress;
}

export interface HeaderUser {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
}

export type ViewPage =
  | 'homepage'
  | 'product_listing'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'login_register'
  | 'order_history'
  | 'admin_dashboard'
  | 'admin_products';
