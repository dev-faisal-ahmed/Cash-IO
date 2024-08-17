'use client';

import * as customForm from '@/components/ui/form';
import { IconPicker } from '@/components/shared/icon-picker/IconPicker';
import { Button } from '@/components/ui/button';
import { useAddCategory } from './useAddCategory';

export const AddCategoryForm = () => {
  const { states, handlers, form } = useAddCategory();
  const { onAddCategory } = handlers;

  return (
    <customForm.Form {...form}>
      <form className='mx-auto max-w-[380px]' onSubmit={onAddCategory}>
        <h3 className='mb-6 text-xl font-semibold'>Add Category</h3>
        <IconPicker form={form} name='icon' />
      </form>
    </customForm.Form>
  );
};
