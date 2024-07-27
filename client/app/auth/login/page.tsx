'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import { loginAction } from '@/app/_actions/login.action';
import { toast } from 'sonner';

export default function LoginPage() {
  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement & {
      email: { value: string };
      password: { value: string };
    };

    const email = form.email.value.trim();
    const password = form.password.value;

    const response = await loginAction({ email, password });
    if (response?.error) return toast.error(response.error);

    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <main className='flex h-full items-center justify-center'>
      <div className='rounded-md border border-neutral-300 p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-semibold'>Cash-IO</h1>

        <form onSubmit={onLogin} className='mb-4 flex flex-col gap-3'>
          <Input name='email' type='email' placeholder='Input Email' required />
          <Input
            name='password'
            type='password'
            placeholder='Input Password'
            required
          />
          <Button className='mt-2'>Register</Button>
        </form>

        <Button className='w-full' variant={'outline'}>
          Login With Google
        </Button>
        <Link
          className='mt-3 block text-center text-sm hover:text-blue-600 hover:underline'
          href={'/auth/register'}
        >
          Create New Account
        </Link>
      </div>
    </main>
  );
}
