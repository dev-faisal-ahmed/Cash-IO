'use client';

import * as customForm from '@/components/ui/form';
import * as select from '@/components/ui/select';
import { useAddCategory } from './useAddCategory';
import { Input } from '@/components/ui/input';
import { IconPicker } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';

export const AddCategoryForm = () => {
  const { states, handlers, form } = useAddCategory();
  const { onAddCategory } = handlers;
  const { isLoading } = states;

  return (
    <customForm.Form {...form}>
      <form className='mx-auto max-w-[380px]' onSubmit={onAddCategory}>
        <h3 className='mb-8 text-xl font-semibold'>Add Category</h3>
        <div className='flex flex-col gap-4'>
          <IconPicker form={form} name='icon' />

          <customForm.FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <customForm.FormItem>
                <customForm.FormLabel>Name</customForm.FormLabel>
                <customForm.FormControl>
                  <Input key={'name'} placeholder='School!' {...field} />
                </customForm.FormControl>
                <customForm.FormMessage />
              </customForm.FormItem>
            )}
          />

          <customForm.FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <customForm.FormItem>
                <customForm.FormLabel>Category Type</customForm.FormLabel>
                <select.Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <select.SelectTrigger>
                    <select.SelectValue placeholder='Select category type' />
                  </select.SelectTrigger>
                  <select.SelectContent>
                    <select.SelectItem value='INCOME'>Income</select.SelectItem>
                    <select.SelectItem value='EXPENSE'>
                      Expense
                    </select.SelectItem>
                    <select.SelectItem value='BOTH'>Both</select.SelectItem>
                  </select.SelectContent>
                </select.Select>
                <customForm.FormMessage />
              </customForm.FormItem>
            )}
          />

          <customForm.FormField
            control={form.control}
            name='budget'
            render={({ field }) => (
              <customForm.FormItem>
                <customForm.FormLabel>Budget</customForm.FormLabel>
                <customForm.FormControl>
                  <Input placeholder='100' type='number' {...field} />
                </customForm.FormControl>
                <customForm.FormDescription>
                  Only input this if you want to add budget
                </customForm.FormDescription>
                <customForm.FormMessage />
              </customForm.FormItem>
            )}
          />
          <Button disabled={isLoading}>Add Category</Button>
        </div>
      </form>
    </customForm.Form>
  );
};
