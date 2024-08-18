'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCategoryMutation } from '@/app/_redux/services';
import { TAddCategoryPayload } from '@/app/_utils/types';
import { addCategorySchema, TAddCategorySchema } from './addCategorySchema';

export const useAddCategory = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const router = useRouter();

  // forms
  const form = useForm<TAddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
  });

  // handlers
  const onAddCategory = form.handleSubmit(async (formData) => {
    const id = toast.loading('Adding category...');
    const { name, icon, type, budget } = formData;

    const payload: TAddCategoryPayload = { name, icon, type };
    if (budget) payload.budget = Number(budget);

    try {
      const response = await addCategory(payload).unwrap();
      if (!response.ok) throw new Error(response.message);
      toast.success(response.message, { id });
      router.push('/categories');
    } catch (err: any) {
      if (err.data?.message) toast.error(err?.data.message, { id });
      else toast.error(err.message, { id });
    }
  });

  return { states: { isLoading }, handlers: { onAddCategory }, form };
};
