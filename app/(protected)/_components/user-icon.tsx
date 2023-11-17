'use client';
import * as Dropdown from '@/components/ui/dropdown-menu';
import * as Avatar from '@/components/ui/avatar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetUser } from '@/hooks/use-get-user';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { AddEditBudget } from '../(dashboard)/_components/budget-goal/add-edit-budget';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { SiTarget } from 'react-icons/si';

export function UserIcon() {
  const { user } = useGetUser();

  if (!user?.email) return redirect('/register');

  return (
    <Dropdown.DropdownMenu>
      <Dropdown.DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
          <Avatar.Avatar className='h-10 w-10'>
            <Avatar.AvatarImage
              src={user?.image as string}
              alt={user?.name?.[0] as string}
            />
            <Avatar.AvatarFallback className='text-2xl font-semibold text-primary dark:text-white'>
              {user?.name?.[0]}
            </Avatar.AvatarFallback>
          </Avatar.Avatar>
        </Button>
      </Dropdown.DropdownMenuTrigger>
      <Dropdown.DropdownMenuContent className='w-56' align='end' forceMount>
        <Dropdown.DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-2'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='truncate text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </Dropdown.DropdownMenuLabel>
        <Dropdown.DropdownMenuSeparator />
        <Dropdown.DropdownMenuItem className='focus:bg-transparent'>
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={() => signOut()}
            className='w-full'
          >
            Log Out
          </Button>
        </Dropdown.DropdownMenuItem>
      </Dropdown.DropdownMenuContent>
    </Dropdown.DropdownMenu>
  );
}
