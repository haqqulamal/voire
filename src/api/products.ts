import api from './axios';
import type { ApiResponse, Category, PaginatedResponse, Product } from '../types/index';

export interface ProductFilters {
  category_id?: number;
  size?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
  page?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const response = await api.get<PaginatedResponse<Product>>('/products', {
    params: filters,
  });
  return response.data;
}

export async function getProduct(slug: string) {
  const response = await api.get<ApiResponse<Product>>(`/products/${slug}`);
  return response.data.data;
}

export async function getCategories() {
  const response = await api.get<ApiResponse<Category[]>>('/categories');
  return response.data.data;
}

export async function getAdminProducts(params: { search?: string; category_id?: number; page?: number } = {}) {
  const response = await api.get<PaginatedResponse<Product>>('/admin/products', { params });
  return response.data;
}

export async function createAdminProduct(payload: Record<string, unknown>) {
  const response = await api.post<ApiResponse<Product>>('/admin/products', payload);
  return response.data.data;
}

export async function updateAdminProduct(id: number, payload: Record<string, unknown>) {
  const response = await api.put<ApiResponse<Product>>(`/admin/products/${id}`, payload);
  return response.data.data;
}

export async function deleteAdminProduct(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/admin/products/${id}`);
  return response.data;
}
