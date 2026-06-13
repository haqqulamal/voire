import { useNavigate } from 'react-router-dom';
import LoginRegisterPage from '../components/LoginRegisterPage';
import { login, register } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();

  return (
    <LoginRegisterPage
      currentUser={{
        name: user?.name || null,
        email: user?.email || null,
        isLoggedIn: Boolean(user),
      }}
      onLoginSuccess={() => undefined}
      onLogin={async (email, password) => {
        const auth = await login({ email, password });
        setAuth(auth.user, auth.token);
      }}
      onRegister={async (name, email, password) => {
        const auth = await register({ name, email, password });
        setAuth(auth.user, auth.token);
      }}
      setActivePage={(page) => navigate(page === 'homepage' ? '/' : '/products')}
    />
  );
}
