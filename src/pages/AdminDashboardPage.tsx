import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDashboard from '../components/AdminDashboard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { toLegacyOrder, toLegacyProduct } from '../api/adapters';
import { getAdminOrders, getDashboard, updateOrderStatus } from '../api/orders';
import { getAdminProducts } from '../api/products';
import type { LegacyOrder } from '../types/index';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dashboard = useQuery({ queryKey: ['admin-dashboard'], queryFn: getDashboard });
  const products = useQuery({ queryKey: ['admin-products'], queryFn: () => getAdminProducts() });
  const orders = useQuery({ queryKey: ['admin-orders'], queryFn: () => getAdminOrders() });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateOrderStatus(id, status.toLowerCase()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });

  if (dashboard.isLoading || products.isLoading || orders.isLoading) {
    return <LoadingSkeleton label="Loading admin dashboard" />;
  }

  if (dashboard.isError || products.isError || orders.isError) {
    return <ErrorState message="Admin data could not be loaded. Confirm you are logged in as admin@voire.com." />;
  }

  const legacyProducts = (products.data?.data || []).map(toLegacyProduct);
  const legacyOrders = (orders.data?.data || dashboard.data?.recent_orders || []).map(toLegacyOrder);

  return (
    <AdminDashboard
      orders={legacyOrders}
      products={legacyProducts}
      setActivePage={(page) => {
        if (page === 'admin_products') navigate('/admin/products');
        else if (page === 'product_listing') navigate('/products');
        else navigate('/admin/dashboard');
      }}
      onUpdateOrderStatus={(orderId, status: LegacyOrder['status']) => {
        const order = legacyOrders.find((item) => item.id === orderId);
        if (order?.apiId) statusMutation.mutate({ id: order.apiId, status });
      }}
    />
  );
}
