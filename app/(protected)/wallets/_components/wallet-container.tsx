'use client';

import { MenuIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { WalletType } from '@/lib/types';
import { EditWallet } from './edit-wallet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';

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
          <Dialog>
            <DialogTrigger>
              <MenuIcon className='cursor-pointer' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wallet Options</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue='edit' className='mt-3 w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='edit'>Edit</TabsTrigger>
                  <TabsTrigger value='transfer'>Transfer</TabsTrigger>
                  <TabsTrigger value='remove'>Remove</TabsTrigger>
                </TabsList>
                <div className='h-5' />
                <TabsContent value='edit'>
                  <EditWallet name={name} icon={icon} />
                </TabsContent>
              </Tabs>
            </DialogContent>
            {/* <DropdownMenuContent className='dark:border-gary-700 w-fit bg-gray-200 dark:bg-[#2f2f2f]'>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  
                </DropdownMenuItem>
                <DropdownMenuItem>Transfer</DropdownMenuItem>
                <DropdownMenuItem>Remove</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent> */}
          </Dialog>
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
