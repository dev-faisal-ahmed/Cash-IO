'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navbar() {
  const { data } = useSession();
  const router = useRouter();

  function handleSignIn() {
    signIn('google');
  }

  if (data?.user?.email) router.push('/');
  return (
    <nav className='flex items-center gap-8 border-b px-8 py-3'>
      <Logo />
      <Button className='ml-auto'>Register</Button>
      <ThemeToggle />
    </nav>
  );
}
