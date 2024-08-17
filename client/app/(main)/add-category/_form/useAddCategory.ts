import { useForm } from 'react-hook-form';
import { addCategorySchema, TAddCategorySchema } from './addCategorySchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useAddCategory = () => {
  const form = useForm<TAddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
  });

  const onAddCategory = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return { states: {}, handlers: { onAddCategory }, form };
};
