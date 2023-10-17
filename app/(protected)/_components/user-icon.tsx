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
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function UserIcon() {
  const { data } = useSession();
  if (!data?.user?.email) return redirect('/register');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar className='h-10 w-10'>
            <AvatarImage
              src={data?.user?.image as string}
              alt={data?.user?.name?.[0] as string}
            />
            <AvatarFallback>{data?.user?.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {data?.user?.name}
            </p>
            <p className='truncate text-xs leading-none text-muted-foreground'>
              {data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => signOut()} className='w-full font-semibold'>
            Log Out
          </Button>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
