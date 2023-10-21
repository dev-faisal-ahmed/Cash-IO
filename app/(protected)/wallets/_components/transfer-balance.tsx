'use client';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { serverAddress } from '@/data/server-address';
import { serverReq } from '@/helpers/server-req';
import { Loader } from '@/components/shared/loader';
import { toast } from '@/components/ui/use-toast';
import { useGetUser } from '@/hooks/use-get-user';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { useGetWalletsQuery } from '@/redux/services/api';
import { useGetIcons } from '@/hooks/use-get-icons';

type TransferBalanceProps = {
  fromWallet: string;
  balance: number;
  onDialogClose: () => void;
};

export function TransferBalance({
  fromWallet,
  balance,
  onDialogClose,
}: TransferBalanceProps) {
  const [loading, setLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const { user } = useGetUser();
  const {
    data: allWallets,
    isLoading,
    isFetching,
  } = useGetWalletsQuery(user?.email!);
  const router = useRouter();
  const { allIconsData } = useGetIcons();

  function onValueChange(value: string) {
    setSelectedWallet(value);
  }

  function onTransferBalance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      amount: { value: string };
    };

    const formData = {
      email: user?.email,
      from: fromWallet,
      to: selectedWallet,
      amount: parseInt(form.amount.value),
    };

    console.log(formData.to);

    if (formData.amount > balance)
      return toast({
        title: 'Insufficient balance',
        variant: 'destructive',
        duration: 1000,
      });

    setLoading(true);

    const url = `${serverAddress}/api/transfer-balance`;
    fetch(url, serverReq('POST', formData))
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: data.msg,
          variant: data.ok ? 'default' : 'destructive',
          duration: 1000,
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
          duration: 1000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (isLoading && isFetching)
    return (
      <div className='flex h-[300px] w-full items-center justify-center'>
        <Loader />
      </div>
    );

  return (
    <form onSubmit={onTransferBalance}>
      <div className='mb-5 flex items-center gap-5'>
        <div className='w-full space-y-3'>
          <Label htmlFor='fromWallet'>Sender Wallet</Label>
          <Input
            className='w-full'
            type='text'
            placeholder='Input Wallet Name'
            defaultValue={fromWallet}
            disabled
          />
        </div>
        <div className='w-full space-y-3'>
          <Label htmlFor='toWallet'>Receiver Wallet</Label>
          <Select onValueChange={onValueChange} required>
            <SelectTrigger id='toWallet'>
              <SelectValue placeholder='Select Wallet' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Wallet Name</SelectLabel>
                {allWallets &&
                  allWallets.map((wallet, index) => (
                    <>
                      {wallet.name !== fromWallet && (
                        <SelectItem key={index} value={wallet.name}>
                          <span className='flex items-center gap-3'>
                            {allIconsData[wallet.icon]} {wallet.name}
                          </span>
                        </SelectItem>
                      )}
                    </>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Label htmlFor='amount'>Amount</Label>
      <Input
        id='amount'
        name='amount'
        className='mt-3'
        type='number'
        placeholder='Input Amount'
      />
      {loading ? (
        <div className='ml-auto mt-5 h-fit w-fit cursor-not-allowed rounded-md border px-3 py-2'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto mt-5 block'>Proceed To Transfer</Button>
      )}
    </form>
  );
}
