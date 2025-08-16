import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button, Input, Checkbox } from '../ui';
import { useAuthStore } from '../../stores';
import envelopeIcon from '../../assets/envelope-icon.svg';
import lockIcon from '../../assets/lock-icon.svg';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  keepSignedIn: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, setLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@tracetrack.com',
      password: 'password123',
      keepSignedIn: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock login validation - check for correct credentials
    if (
      data.email === 'admin@tracetrack.com' &&
      data.password === 'password123'
    ) {
      login({
        id: '1',
        name: 'Admin User',
        email: data.email,
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      });
    } else {
      setError('Invalid credentials. Please check your email and password.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        icon={<img src={envelopeIcon} alt="email" className="w-5 h-5" />}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        icon={<img src={lockIcon} alt="password" className="w-5 h-5" />}
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Keep me signed in"
          {...register('keepSignedIn')}
        />
        <a href="#" className="text-sm text-primary-600 hover:underline">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary-700 to-primary-500 hover:from-primary-800 hover:to-primary-600"
        isLoading={isSubmitting || isLoading}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">Demo credentials are pre-filled</p>
      </div>
    </form>
  );
}
