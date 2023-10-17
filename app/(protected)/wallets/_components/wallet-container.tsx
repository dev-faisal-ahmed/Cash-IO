'use client';

import { MenuIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WalletType } from '@/lib/types';

export function WalletContainer({
  _id,
  name,
  expense,
  revenue,
  icon,
}: WalletType) {
  return (
    <Card className='border bg-transparent dark:border-gray-700'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          {icon} {name}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MenuIcon className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='dark:border-gary-700 w-fit bg-[#2f2f2f]'>
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Transfer</DropdownMenuItem>
                <DropdownMenuItem>Remove</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex'>
          <p>Revenue</p>
          <p className='ml-auto font-semibold'> &#2547; {revenue}</p>
        </div>
        <div className='flex'>
          <p>Expense</p>
          <p className='ml-auto font-semibold'> &#2547; {expense}</p>
        </div>
        <div className='flex'>
          <p>Balance</p>
          <p className='ml-auto font-semibold'>
            &#2547; {(revenue | 0) - (expense | 0)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
