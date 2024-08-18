'use client';

import * as drop from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { logoutAction } from '@/app/_actions';
import { useRouter } from 'next/navigation';

type TProps = {
  size?: number;
  imageUrl?: string;
  name: string;
  email?: string;
  extend?: boolean;
};

export const ProfileIcon = ({ name, size = 40, email, extend }: TProps) => {
  const router = useRouter();

  const onLogout = async () => {
    await logoutAction();
    toast.success('Logged Out!');
    router.push('/auth/login');
  };

  return (
    <>
      {extend ? (
        <>
          <drop.DropdownMenu>
            <drop.DropdownMenuTrigger>
              <div
                className='flex items-center justify-center rounded-full bg-primary text-2xl font-bold text-white'
                style={{ height: size, width: size }}
              >
                {name?.[0]}
              </div>
            </drop.DropdownMenuTrigger>
            <drop.DropdownMenuContent
              side='bottom'
              align='end'
              className='bg-card'
              sideOffset={10}
            >
              <div className='p-2'>
                <h4 className='text-base'>{name}</h4>
                <p className='text-xs text-muted-foreground'>{email}</p>
                <drop.DropdownMenuItem className='cursor-pointer' asChild>
                  <Button
                    onClick={onLogout}
                    className='mt-4 w-full'
                    variant={'destructive'}
                  >
                    Logout
                  </Button>
                </drop.DropdownMenuItem>
              </div>
            </drop.DropdownMenuContent>
          </drop.DropdownMenu>
        </>
      ) : (
        <div
          className='flex items-center justify-center rounded-full bg-primary text-2xl font-bold text-white'
          style={{ height: size, width: size }}
        >
          {name?.[0]}
        </div>
      )}
    </>
  );
};
