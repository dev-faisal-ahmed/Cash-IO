'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema, TRegisterSchema } from './registerSchema';
import { useState } from 'react';
import { toast } from 'sonner';
import { registerAction } from './registerAction';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  // states
  const [isLoading, setIsLoading] = useState(false);

  // form
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  // router
  const router = useRouter();

  // handlers
  const onRegister = form.handleSubmit(async (formData) => {
    const id = toast.loading('Registering...');
    const { name, email, password } = formData;

    try {
      setIsLoading(true);
      const response = await registerAction({ name, email, password });
      if (!response?.ok) throw new Error(response?.message);
      toast.success(response?.message, { id });
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err?.message || 'something went wrong', { id });
    } finally {
      setIsLoading(false);
    }
  });

  return { states: { isLoading }, handlers: { onRegister }, form };
};
