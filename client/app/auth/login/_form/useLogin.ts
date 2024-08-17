'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, TLoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginAction } from './loginAction';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  // states
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();

  // form
  const form = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  // handlers
  const onLogin = form.handleSubmit(async (formData) => {
    const id = toast.loading('Logging in....');

    try {
      setIsLoading(true);

      const response = await loginAction(formData);
      if (!response?.ok) throw new Error(response?.message);

      toast.success(response?.message, { id });
      router.push('/');
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong', { id });
    } finally {
      setIsLoading(false);
    }
  });

  return { states: { isLoading }, handlers: { onLogin }, form };
};
