import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ProductListing from '../components/ProductListing';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { addCartItem } from '../api/cart';
import { toLegacyProduct } from '../api/adapters';
import { getProducts } from '../api/products';
import { useAuthStore } from '../store/authStore';
import type { MainOutletContext } from '../layouts/MainLayout';
import type { LegacyProduct } from '../types/index';

export default function ProductListingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const { selectedCategory, setSelectedCategory } = useOutletContext<MainOutletContext>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const addMutation = useMutation({
    mutationFn: (payload: { product_id: number; size: string; quantity: number }) => addCartItem(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading) return <LoadingSkeleton label="Loading products" />;
  if (isError) return <ErrorState message="Products could not be loaded from the Laravel API." />;

  const products = (data?.data || []).map(toLegacyProduct);

  return (
    <ProductListing
      products={products}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      onSelectProduct={(product: LegacyProduct) => navigate(`/products/${product.slug || product.id}`)}
      onAddToCart={(product, size) => {
        if (!token) {
          navigate('/login');
          return;
        }
        if (product.apiId) {
          addMutation.mutate({ product_id: product.apiId, size, quantity: 1 });
        }
      }}
      setActivePage={(page) => navigate(page === 'cart' ? '/cart' : '/products')}
    />
  );
}
