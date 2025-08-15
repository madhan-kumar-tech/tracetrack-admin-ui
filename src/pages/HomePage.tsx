import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { LoginForm } from '../components/common';
import { useAuthStore } from '../stores';

export function HomePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div
      data-testid="home-page"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Welcome to TraceTrack Admin
          </h1>
          <p className="text-gray-600">
            Please sign in to continue to your dashboard
          </p>
        </div>

        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1"
              >
                Go to Dashboard
              </Button>
              <Button onClick={logout} variant="outline" className="flex-1">
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <LoginForm />
        )}

        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500">
            Built with React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, and
            TanStack Query
          </p>
        </div>
      </div>
    </div>
  );
}
