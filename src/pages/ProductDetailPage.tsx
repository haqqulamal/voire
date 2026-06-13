import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ProductDetail from '../components/ProductDetail';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { addCartItem } from '../api/cart';
import { toLegacyProduct } from '../api/adapters';
import { getProduct } from '../api/products';
import { useAuthStore } from '../store/authStore';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug || ''),
    enabled: Boolean(slug),
  });

  const addMutation = useMutation({
    mutationFn: (payload: { product_id: number; size: string; quantity: number }) => addCartItem(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading) return <LoadingSkeleton label="Loading product detail" />;
  if (isError || !data) return <ErrorState message="This product could not be loaded." />;

  const product = toLegacyProduct(data);

  return (
    <ProductDetail
      product={product}
      onAddToCart={(selectedProduct, size) => {
        if (!token) {
          navigate('/login');
          return;
        }
        if (selectedProduct.apiId) {
          addMutation.mutate({ product_id: selectedProduct.apiId, size, quantity: 1 });
        }
      }}
      setActivePage={(page) => navigate(page === 'cart' ? '/cart' : '/products')}
    />
  );
}
