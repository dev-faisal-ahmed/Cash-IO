'use client';

import * as customForm from '@/components/ui/form';
import { useRegister } from './useRegister';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/shared/PasswordField';
import { Button } from '@/components/ui/button';

export const RegisterForm = () => {
  const { form, handlers } = useRegister();
  const { onRegister } = handlers;

  return (
    <customForm.Form {...form}>
      <form
        className='mt-10 flex w-full max-w-[350px] flex-col gap-4 text-left'
        onSubmit={onRegister}
      >
        {/* name */}
        <customForm.FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <customForm.FormItem>
              <customForm.FormLabel>Name</customForm.FormLabel>
              <customForm.FormControl>
                <Input placeholder='John Doe' {...field} />
              </customForm.FormControl>
              <customForm.FormMessage />
            </customForm.FormItem>
          )}
        />
        {/* email */}
        <customForm.FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <customForm.FormItem>
              <customForm.FormLabel>Email</customForm.FormLabel>
              <customForm.FormControl>
                <Input
                  type='email'
                  placeholder='john.doe@gmail.com'
                  {...field}
                />
              </customForm.FormControl>
              <customForm.FormMessage />
            </customForm.FormItem>
          )}
        />

        <PasswordField
          form={form}
          name='password'
          label='Password'
          description='Minimum length is 4 characters'
        />

        <PasswordField
          form={form}
          name='confirmPassword'
          label='Confirm Password'
        />

        <Button className='mt-4'>Register</Button>
      </form>
    </customForm.Form>
  );
};
