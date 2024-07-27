'use client';
import { logOutAction } from '@/app/_actions/logout.action';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LogoutButton() {
  const router = useRouter();
  const onLogout = async () => {
    await logOutAction();

    toast.success('Successfully LoggedOut');
    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <Button onClick={onLogout} variant={'destructive'}>
      Logout
    </Button>
  );
}
