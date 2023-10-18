'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IconPicker } from '@/components/shared/icon-picker';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { serverAddress } from '@/data/server-address';
import { serverReq } from '@/helpers/server-req';
import { useGetIcons } from '@/hooks/use-get-icons';
import { useGetUser } from '@/hooks/use-get-user';

type EditWalletProps = {
  name: string;
  icon: string;
  _id: string;
  onDialogClose: () => void;
};

export function EditWallet({
  _id,
  name,
  icon,
  onDialogClose,
}: EditWalletProps) {
  const { allIconsData, selectedIcon, handleIconSelection } = useGetIcons();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  function onEditWallet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      walletName: { value: string };
    };

    const walletName = form.walletName.value.trim();
    if (walletName === name && icon === selectedIcon) return;

    setLoading(true);

    const fromData = {
      _id,
      name: walletName,
      icon: selectedIcon || icon,
    };

    const url = `${serverAddress}/api/edit-wallet`;
    fetch(url, serverReq('POST', fromData))
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: data.msg,
          variant: data.ok ? 'default' : 'destructive',
          duration: 2000,
        });
        if (data.ok) {
          router.refresh();
          onDialogClose();
        }
      })
      .catch(() => {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={onEditWallet}>
      <h1 className='mb-5 rounded border p-5 text-center text-9xl'>
        <span className='mx-auto block w-fit'>
          {selectedIcon ? allIconsData[selectedIcon] : allIconsData[icon]}
        </span>
      </h1>
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
        <IconPicker handleSelection={handleIconSelection} />
        {loading ? (
          <div className='ml-auto block h-fit cursor-not-allowed rounded-md border px-5 py-2 font-semibold'>
            <Loader />
          </div>
        ) : (
          <Button className='ml-auto block h-fit px-3 py-2 font-semibold'>
            Edit Wallet
          </Button>
        )}
      </div>
    </form>
  );
}
