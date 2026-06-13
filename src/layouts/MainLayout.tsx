import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import { getCart } from '../api/cart';
import { logout as logoutRequest } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import type { ViewPage } from '../types';

export interface MainOutletContext {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

function pathToPage(pathname: string): ViewPage {
  if (pathname.startsWith('/products/')) return 'product_detail';
  if (pathname.startsWith('/products')) return 'product_listing';
  if (pathname.startsWith('/cart')) return 'cart';
  if (pathname.startsWith('/checkout')) return 'checkout';
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) return 'login_register';
  if (pathname.startsWith('/orders')) return 'order_history';
  if (pathname.startsWith('/admin/products')) return 'admin_products';
  if (pathname.startsWith('/admin')) return 'admin_dashboard';
  return 'homepage';
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user, token, clearAuth } = useAuthStore();
  const { count, setItems, clearCart } = useCartStore();
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: Boolean(token),
  });

  React.useEffect(() => {
    if (cartQuery.data) {
      setItems(cartQuery.data);
    }
  }, [cartQuery.data, setItems]);

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      clearAuth();
      clearCart();
      queryClient.clear();
      navigate('/login');
    },
  });

  const setActivePage = (page: ViewPage) => {
    const paths: Record<ViewPage, string> = {
      homepage: '/',
      product_listing: '/products',
      product_detail: '/products',
      cart: '/cart',
      checkout: '/checkout',
      login_register: '/login',
      order_history: '/orders',
      admin_dashboard: '/admin/dashboard',
      admin_products: '/admin/products',
    };

    navigate(paths[page]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F4] text-[#1C1C1E] selection:bg-[#C9B99A]/35 selection:text-[#1C1C1E]">
      <Header
        activePage={pathToPage(location.pathname)}
        setActivePage={setActivePage}
        cartCount={count}
        currentUser={{
          name: user?.name || null,
          email: user?.email || null,
          isLoggedIn: Boolean(user),
        }}
        selectedCategoryFilter={selectedCategory}
        setSelectedCategoryFilter={setSelectedCategory}
        onLogout={() => logoutMutation.mutate()}
      />

      <main className="flex-1">
        <Outlet context={{ selectedCategory, setSelectedCategory }} />
      </main>

      <footer className="bg-[#1C1C1E] text-[#F8F7F4] pt-16 pb-12 border-t border-[#303033] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="text-xl font-display font-light tracking-[0.2em] text-[#F8F7F4]">VOIRE</h4>
              <p className="text-xs text-gray-400 font-light max-w-xs leading-relaxed">
                Wear the moment. Contemporary minimalist fashion, connected to the live VOIRE catalog.
              </p>
            </div>
            <div>
              <h5 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#C9B99A] mb-4">
                Collections
              </h5>
              <div className="flex flex-col space-y-2 text-xs text-gray-400 font-light">
                {['Tops', 'Bottoms', 'Outerwear', 'Dresses', 'Accessories'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      navigate('/products');
                    }}
                    className="text-left hover:text-white transition-colors cursor-pointer"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#C9B99A] mb-4">
                Client Relations
              </h5>
              <div className="flex flex-col space-y-2 text-xs text-gray-400 font-light">
                <span>Priority tracking updates</span>
                <span>14-day return policy</span>
                <span>Sustainability reports</span>
                <span>Corporate partnerships</span>
              </div>
            </div>
            <div>
              <h5 className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#C9B99A] mb-4">
                Headquarters
              </h5>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Jakarta, Indonesia
                <span className="text-[10px] text-gray-500 block mt-2 font-mono">
                  Service: support@voire-studios.com
                </span>
              </p>
            </div>
          </div>
          <div className="border-t border-[#303033] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider text-gray-500 uppercase">
            <p>Copyright {new Date().getFullYear()} VOIRE Studios. All rights reserved.</p>
            <p className="flex space-x-4 mt-4 sm:mt-0">
              <span>Privacy policy</span>
              <span>Terms of service</span>
              <span>Sitemap</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
