import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CartPage from '../components/CartPage';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getCart, removeCartItem, updateCartItem } from '../api/cart';
import { toLegacyCartItem } from '../api/adapters';

export default function CartRoutePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  const invalidateCart = () => queryClient.invalidateQueries({ queryKey: ['cart'] });
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) => updateCartItem(id, quantity),
    onSuccess: invalidateCart,
  });
  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: invalidateCart,
  });

  if (isLoading) return <LoadingSkeleton label="Loading cart" />;
  if (isError) return <ErrorState message="Your cart could not be loaded." />;

  return (
    <CartPage
      cart={(data || []).map(toLegacyCartItem)}
      onUpdateQty={(id, quantity) => {
        if (quantity <= 0) {
          removeMutation.mutate(Number(id));
          return;
        }
        updateMutation.mutate({ id: Number(id), quantity });
      }}
      onRemoveItem={(id) => removeMutation.mutate(Number(id))}
      setActivePage={(page) => navigate(page === 'checkout' ? '/checkout' : '/products')}
      appliedPromo=""
      setAppliedPromo={() => undefined}
    />
  );
}
