import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import CartRoutePage from './pages/CartRoutePage';
import CheckoutRoutePage from './pages/CheckoutRoutePage';
import OrdersPage from './pages/OrdersPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProtectedRoute from './pages/ProtectedRoute';
import AdminRoute from './pages/AdminRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartRoutePage />} />
            <Route path="/checkout" element={<CheckoutRoutePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderNumber" element={<OrdersPage />} />
            <Route path="/orders/:orderNumber/success" element={<OrderSuccessPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
