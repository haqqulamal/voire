import type {
  CartItem,
  LegacyCartItem,
  LegacyOrder,
  LegacyProduct,
  Order,
  Product,
} from '../types/index';

const fallbackImages = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop',
];

const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace('/api', '');

function normalizeImage(image: string | undefined, index: number) {
  if (!image || image.startsWith('/images/')) {
    return fallbackImages[index % fallbackImages.length];
  }

  if (image.startsWith('/storage/')) {
    return `${apiUrl}${image}`;
  }

  return image;
}

export function toLegacyProduct(product: Product, index = 0): LegacyProduct {
  const price = Number(product.price);
  const stock = Number(product.stock);

  return {
    id: String(product.id),
    apiId: product.id,
    slug: product.slug,
    name: product.name,
    price,
    category: product.category?.name || 'Collection',
    primaryImage: normalizeImage(product.images?.[0], index),
    secondaryImage: normalizeImage(product.images?.[1], index + 1),
    description: product.description,
    sizes: product.sizes || [],
    details: [
      product.category?.name ? `Collection: ${product.category.name}` : 'Curated VOIRE piece',
      `Available stock: ${stock}`,
      'Designed for contemporary everyday styling',
    ],
    status: stock <= 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'In Stock',
    featured: index < 4,
  };
}

export function toLegacyCartItem(item: CartItem, index = 0): LegacyCartItem {
  return {
    id: String(item.id),
    apiId: item.id,
    product: toLegacyProduct(item.product, index),
    selectedSize: item.size,
    quantity: item.quantity,
  };
}

export function toLegacyOrder(order: Order): LegacyOrder {
  return {
    id: order.order_number,
    apiId: order.id,
    date: order.created_at?.slice(0, 10) || '',
    total: Number(order.total),
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1) as LegacyOrder['status'],
    shippingAddress: {
      fullName: order.address?.recipient_name || order.user?.name || 'VOIRE Customer',
      email: order.user?.email || '',
      address: order.address?.address || '',
      city: order.address?.city || '',
      postalCode: order.address?.postal_code || '',
      country: order.address?.province || 'Indonesia',
    },
    items: (order.items || []).map((item, index) => ({
      productName: item.product?.name || 'VOIRE Product',
      size: item.size,
      quantity: item.quantity,
      price: Number(item.price),
      image: normalizeImage(item.product?.images?.[0], index),
    })),
  };
}
