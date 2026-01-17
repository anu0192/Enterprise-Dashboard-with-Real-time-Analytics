import { AuthLayout } from '@/components/templates/AuthLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

