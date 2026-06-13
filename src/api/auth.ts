import api from './axios';
import type { ApiResponse, AuthPayload, User } from '../types/index';

export async function register(payload: { name: string; email: string; password: string }) {
  const response = await api.post<ApiResponse<AuthPayload>>('/register', payload);
  return response.data.data;
}

export async function login(payload: { email: string; password: string }) {
  const response = await api.post<ApiResponse<AuthPayload>>('/login', payload);
  return response.data.data;
}

export async function logout() {
  const response = await api.post<ApiResponse<null>>('/logout');
  return response.data;
}

export async function me() {
  const response = await api.get<ApiResponse<User>>('/me');
  return response.data.data;
}
