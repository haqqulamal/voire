import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminProductManagement from '../components/AdminProductManagement';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { toLegacyProduct } from '../api/adapters';
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  getCategories,
  updateAdminProduct,
} from '../api/products';
import type { LegacyProduct } from '../types/index';

function stockFromStatus(status: LegacyProduct['status']) {
  if (status === 'Out of Stock') return 0;
  if (status === 'Low Stock') return 8;
  return 24;
}

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const products = useQuery({ queryKey: ['admin-products'], queryFn: () => getAdminProducts() });
  const categories = useQuery({ queryKey: ['categories'], queryFn: getCategories });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin-products'] });
  const createMutation = useMutation({ mutationFn: createAdminProduct, onSuccess: invalidate });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => updateAdminProduct(id, payload),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({ mutationFn: deleteAdminProduct, onSuccess: invalidate });

  if (products.isLoading || categories.isLoading) return <LoadingSkeleton label="Loading admin products" />;
  if (products.isError || categories.isError) return <ErrorState message="Product management could not be loaded." />;

  const legacyProducts = (products.data?.data || []).map(toLegacyProduct);
  const categoryMap = new Map((categories.data || []).map((category) => [category.name, category.id]));
  const fallbackCategoryId = categories.data?.[0]?.id || 1;

  const makePayload = (product: LegacyProduct) => ({
    category_id: categoryMap.get(product.category) || fallbackCategoryId,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    sizes: product.sizes,
    images: [product.primaryImage, product.secondaryImage].filter(Boolean),
    stock: stockFromStatus(product.status),
    is_active: product.status !== 'Out of Stock',
  });

  return (
    <AdminProductManagement
      products={legacyProducts}
      setActivePage={(page) => {
        if (page === 'admin_dashboard') navigate('/admin/dashboard');
        else if (page === 'product_listing') navigate('/products');
        else navigate('/admin/products');
      }}
      onAddProduct={(product) => createMutation.mutate(makePayload(product))}
      onUpdateProduct={(product) => {
        if (product.apiId) updateMutation.mutate({ id: product.apiId, payload: makePayload(product) });
      }}
      onDeleteProduct={(id) => deleteMutation.mutate(Number(id))}
    />
  );
}
