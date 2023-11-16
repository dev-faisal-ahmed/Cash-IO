'use client';
import * as Select from '@/components/ui/select';
import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { Label } from '@/components/ui/label';
import {
  useGetWalletsQuery,
  useTransferBalanceMutation,
} from '@/redux/services/api';
import { useGetIcons } from '@/hooks/use-get-icons';
import { FormInput } from '@/components/shared/form-input';
import { errorToast, generalToast } from '@/helpers/toast-helper';

type TransferBalanceProps = {
  fromWallet: string;
  balance: number;
  icon: string;
  onDialogClose: () => void;
};

export function TransferBalance({
  fromWallet,
  balance,
  onDialogClose,
  icon,
}: TransferBalanceProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>();
  const { user } = useGetUser();
  const { allIconsData } = useGetIcons();
  const { data: allWallets, isLoading } = useGetWalletsQuery(user?.email!);
  const [transferBalance, { isLoading: reqIsLoading }] =
    useTransferBalanceMutation();

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
      icon,
    };

    if (formData.amount > balance) return errorToast('Insufficient balance');

    transferBalance(formData)
      .unwrap()
      .then((response) => {
        generalToast(response.msg, response.ok);
        if (response.ok) onDialogClose();
      })
      .catch(() => errorToast());
  }

  if (isLoading)
    return (
      <div className='flex h-[300px] w-full items-center justify-center'>
        <Loader />
      </div>
    );

  return (
    <form onSubmit={onTransferBalance}>
      <div className='mb-5 flex flex-col items-center gap-5 sm:flex-row'>
        <div className='w-full space-y-3'>
          <FormInput
            title='Sender Wallet'
            name='fromWallet'
            type='text'
            placeholder='Input Wallet Name'
            defaultValue={fromWallet}
            disabled
          />
        </div>
        <div className='w-full space-y-3'>
          <Label htmlFor='toWallet'>Receiver Wallet</Label>
          <Select.Select onValueChange={onValueChange} required>
            <Select.SelectTrigger id='toWallet'>
              <Select.SelectValue placeholder='Select Wallet' />
            </Select.SelectTrigger>
            <Select.SelectContent>
              <Select.SelectGroup>
                {allWallets ? (
                  allWallets.map((wallet, index) => (
                    <>
                      {wallet.name !== fromWallet && (
                        <Select.SelectItem key={index} value={wallet.name}>
                          <span className='flex items-center gap-3'>
                            {allIconsData[wallet.icon]} {wallet.name}
                          </span>
                        </Select.SelectItem>
                      )}
                    </>
                  ))
                ) : (
                  <span className='px-3 text-sm text-muted-foreground'>
                    No Wallet Found
                  </span>
                )}
              </Select.SelectGroup>
            </Select.SelectContent>
          </Select.Select>
        </div>
      </div>
      <FormInput
        title='Amount'
        name='amount'
        type='number'
        placeholder='Input Amount'
        required
      />
      {reqIsLoading ? (
        <div className='ml-auto mt-8 h-fit w-fit cursor-not-allowed rounded-md border px-3 py-2'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto mt-8 block'>Proceed To Transfer</Button>
      )}
    </form>
  );
}
