'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useGetUser } from '@/hooks/use-get-user';

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function UserIcon() {
  const { user } = useGetUser();
  if (!user?.email) return redirect('/register');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10'>
            <AvatarImage
              src={user?.image as string}
              alt={user?.name?.[0] as string}
            />
            <AvatarFallback className='text-2xl font-semibold text-primary dark:text-white'>
              {user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-2'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='truncate text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='focus:bg-transparent'>
          <Button
            variant={'destructive'}
            onClick={() => signOut()}
            className='w-full'
          >
            Log Out
          </Button>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
