'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconPicker } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetIcons } from '@/hooks/use-get-icons';
import { PlusIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { serverReq } from '@/helpers/server-req';
import { useGetUser } from '@/hooks/use-get-user';
import { Loader } from '@/components/shared/loader';

export function AddWallet() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedIcon, handleIconSelection, allIconsData } = useGetIcons();
  const { toast } = useToast();
  const { user } = useGetUser();
  const router = useRouter();

  function onAddWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLInputElement & {
      walletName: { value: string };
      initialBalance: { value: string };
      fixedDeposit: { checked: boolean };
    };

    if (!selectedIcon) {
      toast({
        title: 'Icon Not Found',
        duration: 1000,
        description: 'Please select an Icon',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    const formData = {
      name: form.walletName.value.trim(),
      initialBalance: parseInt(form.initialBalance.value),
      fixedDeposit: form.fixedDeposit.checked,
      icon: selectedIcon,
      email: user?.email,
    };

    fetch('api/add-wallet', serverReq('POST', formData))
      .then((res) =>
        res.json().then((data) => {
          toast({
            title: data.msg,
            variant: data.ok ? 'default' : 'destructive',
            duration: 1000,
          });
          if (res.ok) {
            router.refresh();
            setOpen(false);
          }
        }),
      )
      .catch(() => {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          duration: 1000,
        });
        setOpen(false);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='flex min-h-[220px] w-full items-center justify-center rounded-lg border bg-gray-100 text-primary dark:bg-transparent dark:text-white'>
        <PlusIcon className='text-3xl' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='capitalize'>Add a new wallet</DialogTitle>
        </DialogHeader>

        {selectedIcon ? (
          <h1 className='ml-auto w-full rounded-lg border p-3 text-9xl'>
            <span className='mx-auto block w-fit'>
              {allIconsData[selectedIcon]}
            </span>
          </h1>
        ) : (
          <p className='ml-auto rounded-lg border p-3'>Select Any Icon</p>
        )}

        <form onSubmit={onAddWallet} className='mt-5'>
          <div className='mb-5 flex items-center gap-5'>
            <div className='w-full space-y-3 whitespace-nowrap'>
              <Label>Pick An Icon</Label>
              <IconPicker
                handleSelection={handleIconSelection}
                className='w-full'
              />
            </div>
            <div className='w-full space-y-3'>
              <Label htmlFor='walletName'>Wallet Name</Label>
              <Input
                id='walletName'
                name='walletName'
                className='w-full'
                type='text'
                placeholder='Input Wallet Name'
                required
              />
            </div>
          </div>

          <Label htmlFor='initialBalance'>Initial Balance</Label>
          <Input
            id='initialBalance'
            name='initialBalance'
            className='mt-3'
            type='number'
            placeholder='Initial Balance'
            required
          />
          <div className='h-5' />

          <div className='mt-5 flex items-center gap-3'>
            <Input
              className='h-4 w-4'
              type='checkbox'
              id='fixedDeposit'
              name='fixedDeposits'
            />
            <Label
              className='text-sm text-muted-foreground'
              htmlFor='fixedDeposit'
            >
              Make this wallet fixed deposit
            </Label>
          </div>
          {loading ? (
            <div className='ml-auto h-fit w-fit cursor-not-allowed rounded-md border px-3 py-2'>
              <Loader />
            </div>
          ) : (
            <Button className='ml-auto mt-5 block' type='submit'>
              Add Wallet
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}