import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Homepage from '../components/Homepage';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getProducts } from '../api/products';
import { toLegacyProduct } from '../api/adapters';
import type { MainOutletContext } from '../layouts/MainLayout';
import type { LegacyProduct } from '../types/index';

export default function HomePage() {
  const navigate = useNavigate();
  const { setSelectedCategory } = useOutletContext<MainOutletContext>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 'home'],
    queryFn: () => getProducts(),
  });

  if (isLoading) return <LoadingSkeleton label="Loading homepage products" />;
  if (isError) return <ErrorState message="Please confirm the Laravel API is running at http://localhost:8000/api." />;

  const products = (data?.data || []).map(toLegacyProduct);

  return (
    <Homepage
      products={products}
      onSelectProduct={(product: LegacyProduct) => navigate(`/products/${product.slug || product.id}`)}
      setActivePage={(page) => navigate(page === 'homepage' ? '/' : '/products')}
      setSelectedCategoryFilter={setSelectedCategory}
    />
  );
}
