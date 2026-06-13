import api from './axios';
import type { ApiResponse, Order, PaginatedResponse } from '../types/index';

export async function checkout(payload: { address_id: number; notes?: string }) {
  const response = await api.post<ApiResponse<Order>>('/checkout', payload);
  return response.data.data;
}

export async function getOrders() {
  const response = await api.get<PaginatedResponse<Order>>('/orders');
  return response.data;
}

export async function getOrder(orderNumber: string) {
  const response = await api.get<ApiResponse<Order>>(`/orders/${orderNumber}`);
  return response.data.data;
}

export async function getAdminOrders(params: { search?: string; status?: string; page?: number } = {}) {
  const response = await api.get<PaginatedResponse<Order>>('/admin/orders', { params });
  return response.data;
}

export async function updateOrderStatus(id: number, status: string) {
  const response = await api.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status });
  return response.data.data;
}

export async function getDashboard() {
  const response = await api.get<ApiResponse<{
    total_revenue: number;
    orders_today: number;
    total_products: number;
    total_customers: number;
    weekly_revenue: { date: string; revenue: number }[];
    recent_orders: Order[];
  }>>('/admin/dashboard');
  return response.data.data;
}
