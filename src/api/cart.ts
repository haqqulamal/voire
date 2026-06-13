import api from './axios';
import type { ApiResponse, CartItem } from '../types/index';

export async function getCart() {
  const response = await api.get<ApiResponse<CartItem[]>>('/cart');
  return response.data.data;
}

export async function addCartItem(payload: { product_id: number; size: string; quantity: number }) {
  const response = await api.post<ApiResponse<CartItem>>('/cart', payload);
  return response.data.data;
}

export async function updateCartItem(id: number, quantity: number) {
  const response = await api.put<ApiResponse<CartItem>>(`/cart/${id}`, { quantity });
  return response.data.data;
}

export async function removeCartItem(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/cart/${id}`);
  return response.data;
}

export async function clearCart() {
  const response = await api.delete<ApiResponse<null>>('/cart');
  return response.data;
}
