'use client';

import { Button } from '@/components/ui/button';
import { useGetUser } from '@/hooks/use-get-user';
import { ArrowRight } from 'lucide-react';
import { redirect } from 'next/navigation';

export function Register() {
  const { user, registerWithGoogle } = useGetUser();
  if (user?.email) redirect('/');

  return (
    <section className='mx-auto max-w-2xl text-center'>
      <h1 style={{ lineHeight: '55px' }} className='mt-40 text-5xl'>
        Money Management Simplified by{' '}
        <span className='mt-1 block underline'>Cash-IO</span>
      </h1>
      <p className='gray-500 mt-5 text-sm dark:text-gray-200'>{`Take control of your finances, with intuitive features and real-time insights. Our app simplifies budgeting, saving, and spending.`}</p>
      <Button onClick={registerWithGoogle} className='mt-5'>
        Register / Login <ArrowRight className='ml-2 h-5 w-5' />
      </Button>
    </section>
  );
}
