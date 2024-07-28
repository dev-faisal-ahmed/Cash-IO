'use client';

import { logOutAction } from '@/app/_actions/logout.action';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();
  const onLogout = async () => {
    await signOut();
    await logOutAction();

    toast.success('Successfully LoggedOut');
    router.refresh();
  };

  return (
    <Button onClick={onLogout} variant={'destructive'}>
      Logout
    </Button>
  );
}
