'use client';
import * as Dialog from '@/components/ui/dialog';
import { FormEvent, useState } from 'react';
import { IconPicker } from '@/components/shared/icon-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetIcons } from '@/hooks/use-get-icons';
import { PlusIcon } from 'lucide-react';
import { useGetUser } from '@/hooks/use-get-user';
import { Loader } from '@/components/shared/loader';
import { useAddWalletMutation } from '@/redux/services/api';
import { FormInput } from '@/components/shared/form-input';
import { errorToast, generalToast } from '@/helpers/toast-helper';

export function AddWallet() {
  const [open, setOpen] = useState(false);
  const { selectedIcon, handleIconSelection, allIconsData } = useGetIcons();
  const { user } = useGetUser();
  const [addWallet, { isLoading }] = useAddWalletMutation();

  function onAddWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLInputElement & {
      walletName: { value: string };
      initialBalance: { value: string };
      saving: { checked: boolean };
    };

    if (!selectedIcon) return errorToast('Please select an Icon');

    const formData = {
      name: form.walletName.value.trim(),
      initialBalance: parseInt(form.initialBalance.value),
      saving: form.saving.checked,
      icon: selectedIcon,
      email: user?.email,
    };

    addWallet(formData)
      .unwrap()
      .then((response) => {
        generalToast(response.msg, response.ok);
        if (response.ok) setOpen(false);
      })
      .catch(() => errorToast());
  }

  return (
    <Dialog.Dialog open={open} onOpenChange={setOpen}>
      <Dialog.DialogTrigger className='flex min-h-[200px] w-full items-center justify-center rounded-lg border border-gray-400 text-primary dark:border-white dark:bg-transparent dark:text-white md:bg-gray-100'>
        <PlusIcon className='text-3xl' />
        <span className='pl-2'>Add A New Wallet</span>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className='capitalize'>
            Add a new wallet
          </Dialog.DialogTitle>
        </Dialog.DialogHeader>
        {selectedIcon && (
          <div className='mt-3 w-full rounded-lg border p-3 text-9xl'>
            <span className='mx-auto block w-fit'>
              {allIconsData[selectedIcon]}
            </span>
          </div>
        )}
        <form onSubmit={onAddWallet} className='mt-5'>
          <div className='mb-5 flex flex-col items-center gap-5 sm:flex-row'>
            <div className='w-full space-y-3 whitespace-nowrap'>
              <Label>Pick An Icon</Label>
              <IconPicker
                handleSelection={handleIconSelection}
                className='w-full'
              />
            </div>
            <FormInput
              title='Wallet Name'
              name='walletName'
              type='text'
              placeholder='Input Wallet Name'
              required
            />
          </div>

          <FormInput
            title='Initial Balance Name'
            name='initialBalance'
            type='number'
            placeholder='Input Initial Balance'
            min={1}
            required
          />
          <div className='h-5' />
          <div className='mt-3 flex items-center gap-3'>
            <Input
              className='h-4 w-4'
              type='checkbox'
              id='saving'
              name='saving'
            />
            <Label className='text-sm text-muted-foreground' htmlFor='saving'>
              Make this wallet saving wallet
            </Label>
          </div>
          {isLoading ? (
            <div className='ml-auto h-fit w-fit cursor-not-allowed rounded-md border px-3 py-2'>
              <Loader />
            </div>
          ) : (
            <Button className='ml-auto mt-5 block' type='submit'>
              Add Wallet
            </Button>
          )}
        </form>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
