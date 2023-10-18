'use client';

import { IconPicker } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';

export function AddWallet() {
  return (
    <Dialog>
      <DialogTrigger className='flex w-full items-center justify-center rounded-lg border bg-gray-100 text-primary dark:bg-transparent dark:text-white'>
        <PlusIcon className='text-3xl' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='capitalize'>Add a new wallet</DialogTitle>
        </DialogHeader>
        <form className='mt-5'>
          <label htmlFor='walletName'>Wallet Name</label>
          <Input
            id='walletName'
            name='walletName'
            className='mb-5 mt-3'
            type='text'
            placeholder='Input Wallet Name'
          />
          <label htmlFor='initialBalance'>Initial Balance</label>
          <Input
            id='initialBalance'
            name='initialBalance'
            className='mt-3'
            type='number'
            placeholder='Initial Balance'
          />
          <div className='h-5' />
          <IconPicker />
          <div className='mt-5 flex items-center gap-3'>
            <Checkbox id='fixedDeposit' name='fixedDeposits' />
            <label
              className='text-sm text-muted-foreground'
              htmlFor='fixedDeposit'
            >
              Make this wallet fixed deposit
            </label>
          </div>
          <Button className='ml-auto mt-5 block' type='submit'>
            Add Wallet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
