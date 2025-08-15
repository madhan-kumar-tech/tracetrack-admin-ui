import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '../ui';
import { useAuthStore } from '../../stores';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, setLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@tracetrack.com',
      password: 'password123',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login - in real app, this would be an API call
    login({
      id: '1',
      name: 'Admin User',
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      
      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting || isLoading}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Demo credentials are pre-filled
        </p>
      </div>
    </form>
  );
}
