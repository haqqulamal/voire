import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { getAdminOrders, updateOrderStatus } from '../api/orders';

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => getAdminOrders(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  });

  if (isLoading) return <LoadingSkeleton label="Loading admin orders" />;
  if (isError) return <ErrorState message="Admin orders could not be loaded." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <div className="mb-8 border-b border-[#E8E6E1]/50 pb-5">
        <span className="text-[10px] tracking-[0.2em] text-[#C9B99A] uppercase font-bold">
          Administrative Orders
        </span>
        <h1 className="text-3xl font-display font-light text-[#1C1C1E] tracking-tight mt-1">
          Order Management
        </h1>
      </div>

      <div className="bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans divide-y divide-[#E8E6E1]/70">
            <thead className="bg-[#F8F7F4] text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6E1]/50">
              {(data?.data || []).map((order) => (
                <tr key={order.id}>
                  <td className="py-4 px-4 font-mono font-bold">{order.order_number}</td>
                  <td className="py-4 px-4">{order.user?.name || 'Customer'}</td>
                  <td className="py-4 px-4">Rp{Number(order.total).toLocaleString('id-ID')}</td>
                  <td className="py-4 px-4 capitalize">{order.payment?.status || 'pending'}</td>
                  <td className="py-4 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(event) => statusMutation.mutate({ id: order.id, status: event.target.value })}
                      className="text-[10px] font-sans font-bold uppercase py-1 px-2 border rounded-[2px] bg-white cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
