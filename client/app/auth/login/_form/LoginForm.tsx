'use client';

import * as customForm from '@/components/ui/form';
import Link from 'next/link';
import { useLogin } from './useLogin';
import { Input } from '@/components/ui/input';
import { PasswordField } from '@/components/shared/PasswordField';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
  const { states, handlers, form } = useLogin();
  const { isLoading } = states;
  const { onLogin } = handlers;

  return (
    <customForm.Form {...form}>
      <form
        className='mt-10 flex w-full max-w-[350px] flex-col gap-4 text-left'
        onSubmit={onLogin}
      >
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

        <p className='text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link className='text-primary underline' href={'/auth/register'}>
            Register
          </Link>
        </p>

        <Button disabled={isLoading} className='mt-2'>
          Login
        </Button>
      </form>
    </customForm.Form>
  );
};
