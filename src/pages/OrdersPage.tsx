import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import OrderHistory from '../components/OrderHistory';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { toLegacyOrder } from '../api/adapters';
import { getOrders } from '../api/orders';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isLoading) return <LoadingSkeleton label="Loading orders" />;
  if (isError) return <ErrorState message="Your order archive could not be loaded." />;

  return (
    <OrderHistory
      orders={(data?.data || []).map(toLegacyOrder)}
      setActivePage={(page) => navigate(page === 'product_listing' ? '/products' : '/')}
    />
  );
}
