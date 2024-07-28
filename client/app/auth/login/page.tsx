'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const onGoogleLogin = async () => {
    console.log('I am Pressed');
    await signIn('google');
  };

  return (
    <main className='flex h-full items-center justify-center'>
      <div className='rounded-md border border-neutral-300 p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-semibold'>Cash-IO</h1>

        <form className='mb-4 flex flex-col gap-3'>
          <Input name='email' type='email' placeholder='Input Email' required />
          <Input
            name='password'
            type='password'
            placeholder='Input Password'
            required
          />
          <Button className='mt-2'>Login</Button>
        </form>

        <Button onClick={onGoogleLogin} className='w-full' variant={'outline'}>
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
