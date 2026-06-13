import api from './axios';
import type { ApiResponse } from '../types/index';

export async function getSnapToken(orderNumber: string) {
  const response = await api.post<ApiResponse<{ snap_token: string; client_key: string }>>(
    `/payment/${orderNumber}/snap-token`,
  );
  return response.data.data;
}
