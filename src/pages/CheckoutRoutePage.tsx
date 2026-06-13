import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CheckoutPage from '../components/CheckoutPage';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getCart } from '../api/cart';
import { toLegacyCartItem } from '../api/adapters';
import { checkout } from '../api/orders';
import { getSnapToken } from '../api/payment';
import type { ShippingAddress } from '../types';

function loadMidtransSnap(clientKey: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', clientKey || import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '');
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load Midtrans Snap.'));
    document.body.appendChild(script);
  });
}

export default function CheckoutRoutePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

  if (isLoading) return <LoadingSkeleton label="Loading checkout" />;
  if (isError) return <ErrorState message="Checkout could not load your cart." />;

  return (
    <CheckoutPage
      cart={(data || []).map(toLegacyCartItem)}
      appliedPromo=""
      setActivePage={(page) => navigate(page === 'cart' ? '/cart' : '/products')}
      onPlaceOrder={async (shippingAddress: ShippingAddress) => {
        const order = await checkout({
          address_id: 1,
          notes: `Checkout address: ${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`,
        });
        const snap = await getSnapToken(order.order_number);
        await loadMidtransSnap(snap.client_key);

        window.snap?.pay(snap.snap_token, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            navigate(`/orders/${order.order_number}/success`);
          },
          onPending: () => navigate(`/orders/${order.order_number}`),
          onError: () => navigate(`/orders/${order.order_number}`),
        });

        return order.order_number;
      }}
    />
  );
}
