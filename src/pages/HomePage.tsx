import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/common';
import { useAuthStore } from '../stores';
import loginBg from '../assets/login_bg.svg';
import logo from '../assets/logo.svg';
import loginBgRight from '../assets/login_bg_right.svg';

export function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="fixed inset-0 min-h-screen w-full flex">
      {/* Left: Illustration */}
      <div className="hidden md:flex w-1/2 h-full bg-white-100 relative">
        <img
          src={loginBg}
          alt="Map Illustration"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Right: Login Form + Right Illustration */}
      <div className="flex-1 flex flex-row h-full relative bg-white">
        <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 relative z-10">
          <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col items-center mb-8">
              <img src={logo} alt="Tracetrack Logo" className="h-50 w-50 mb-2" />
            </div>
            <div className="bg-white rounded-lg shadow-none p-0">
              <LoginForm />
            </div>
          </div>
        </div>
        {/* Right-side Illustration */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 h-full pointer-events-none">
          <img
            src={loginBgRight}
            alt="Right Illustration"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
