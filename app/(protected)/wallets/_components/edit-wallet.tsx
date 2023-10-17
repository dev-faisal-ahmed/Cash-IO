'use client';

import { IconContainer } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type EditWalletProps = {
  name: string;
  icon: string;
};

export function EditWallet({ name, icon }: EditWalletProps) {
  return (
    <form className='rounded-lg border p-5 dark:border-gray-700'>
      <Label htmlFor='walletName' className='px-2 font-medium'>
        Wallet Name
        <Input
          id='walletName'
          className='mt-3 bg-transparent'
          placeholder='Wallet Name?'
          name='walletName'
          defaultValue={name}
        />
      </Label>
      <div className='h-1' />
      <div className='flex items-center'>
        <IconContainer />
        <Button className='ml-auto block h-fit px-3 py-2 font-semibold'>
          Edit Wallet
        </Button>
      </div>
    </form>
  );
}
