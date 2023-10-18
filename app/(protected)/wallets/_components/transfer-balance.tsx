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

type TransferBalanceProps = {
  allWallets: string[];
  fromWallet: string;
  balance: number;
  onDialogClose: () => void;
};

export function TransferBalance({
  allWallets,
  fromWallet,
  balance,
  onDialogClose,
}: TransferBalanceProps) {
  const [loading, setLoading] = useState(false);
  function onTransferBalance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      toWallet: { value: string };
      amount: { value: string };
    };

    const formData = {
      fromWallet,
      toWallet: form.toWallet.value.trim(),
      amount: parseInt(form.amount.value),
    };

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
        onDialogClose();
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

  return (
    <form onSubmit={onTransferBalance}>
      <div className='mb-5 flex items-center gap-5'>
        <div className='w-full space-y-3'>
          <label htmlFor='fromWallet'>Sender Wallet</label>
          <Input
            className='w-full'
            type='text'
            placeholder='Input Wallet Name'
            defaultValue={fromWallet}
            disabled
          />
        </div>
        <div className='w-full space-y-3'>
          <label htmlFor='toWallet'>Receiver Wallet</label>
          <Select required>
            <SelectTrigger id='toWallet' name='toWallet'>
              <SelectValue placeholder='Select Wallet' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Wallet Name</SelectLabel>
                {allWallets.map((walletName, index) => (
                  <>
                    {walletName !== fromWallet && (
                      <SelectItem key={index} value={walletName}>
                        {walletName}
                      </SelectItem>
                    )}
                  </>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <label htmlFor='amount'>Amount</label>
      <Input
        id='amount'
        name='amount'
        className='mt-3'
        type='number'
        placeholder='Input Amount'
      />
      {loading ? (
        <div className='ml-auto mt-5 block h-fit w-fit cursor-not-allowed rounded-md border px-5 py-2 font-semibold'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto mt-5 block'>Proceed To Transfer</Button>
      )}
    </form>
  );
}
