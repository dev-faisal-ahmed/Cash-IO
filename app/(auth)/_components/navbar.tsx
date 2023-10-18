'use client';

import { redirect } from 'next/navigation';
import { Logo } from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useGetUser } from '@/hooks/use-get-user';

export function Navbar() {
  const { user, registerWithGoogle } = useGetUser();
  if (user?.email) redirect('/');

  return (
    <nav className='flex items-center gap-8 border-b px-8 py-3'>
      <Logo />
      <Button onClick={registerWithGoogle} className='ml-auto'>
        Register
      </Button>
      <ThemeToggle />
    </nav>
  );
}
