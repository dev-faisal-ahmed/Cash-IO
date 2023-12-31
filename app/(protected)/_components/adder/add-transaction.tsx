'use client';
import * as Select from '@/components/ui/select';
import { FormEvent, useState } from 'react';
import { FormInput } from '@/components/shared/form-input';
import { CalendarPopover } from '@/components/shared/calendar-popover';
import { Label } from '@/components/ui/label';
import { useGetIcons } from '@/hooks/use-get-icons';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { errorToast, generalToast } from '@/helpers/toast-helper';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { TabsOptionsType } from './adder';
import { FiPlus } from 'react-icons/fi';

import {
  useAddTransactionMutation,
  useGetCategoriesQuery,
  useGetWalletForTransactionQuery,
} from '@/redux/services/api';
import { useRouter } from 'next/navigation';

type AddTransactionProps = {
  onDialogClose: () => void;
  onTabChange: (tabName: TabsOptionsType) => void;
};

export function AddTransaction({
  onDialogClose,
  onTabChange,
}: AddTransactionProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<'expense' | 'revenue'>('expense');
  const [categoryAndIcon, setCategoryAndIcon] = useState<string>();
  const [wallet, setWallet] = useState<string>();
  const { allIconsData } = useGetIcons();
  const { user } = useGetUser();
  const { data: wallets } = useGetWalletForTransactionQuery(
    user?.email as string,
  );
  const { data: categories } = useGetCategoriesQuery(user?.email as string);
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  function onAddWalletButtonPress() {
    router.push('/wallets');
    onDialogClose();
  }

  function onTypeChange(value: string) {
    setType(value as 'expense' | 'revenue');
  }

  function onCategoryAndIconChange(value: string) {
    setCategoryAndIcon(value);
  }

  function onWalletChange(value: string) {
    setWallet(value);
  }

  async function onAddTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      amount: { value: string };
      description: { value: string };
    };
    const formData = {
      amount: parseInt(form.amount.value),
      description: form.description.value.trim(),
      category: categoryAndIcon?.split('+')[0],
      icon: categoryAndIcon?.split('+')[1],
      email: user?.email,
      date,
      type,
      wallet,
    };

    const balance = wallets![wallet!].revenue - wallets![wallet!].expense;

    if (formData.amount <= 0)
      return errorToast('Amount must be greater than zero');
    else if (balance < formData.amount && type === 'expense')
      return errorToast('Insufficient balance');

    addTransaction(formData)
      .unwrap()
      .then((res) => {
        generalToast(res.msg, res.ok);
        if (res.ok) onDialogClose();
      })
      .catch(() => errorToast());
  }

  console.log(wallet);

  return (
    <form onSubmit={onAddTransaction}>
      <div className='flex flex-col items-center gap-5 sm:flex-row'>
        <FormInput
          title='Amount'
          placeholder='Enter amount'
          name='amount'
          type='number'
          min={1}
          required
        />
        <CalendarPopover date={date} setDate={setDate} />
      </div>
      <div className='mt-5 flex flex-col items-center gap-5 sm:flex-row'>
        <div className='w-full space-y-3'>
          <Label>Transaction Type</Label>
          <Select.Select value={type} onValueChange={onTypeChange} required>
            <Select.SelectTrigger>
              <Select.SelectValue placeholder='Select Type' />
            </Select.SelectTrigger>
            <Select.SelectContent>
              <Select.SelectItem value='expense'>Expense</Select.SelectItem>
              <Select.SelectItem value='revenue'>Revenue</Select.SelectItem>
            </Select.SelectContent>
          </Select.Select>
        </div>
        <div className='w-full space-y-3'>
          <Label>Category</Label>
          <Select.Select
            value={categoryAndIcon}
            onValueChange={onCategoryAndIconChange}
            required
          >
            <Select.SelectTrigger>
              <Select.SelectValue placeholder='Select Category' />
            </Select.SelectTrigger>
            <Select.SelectContent>
              {categories?.[type] && categories?.[type]?.length > 0 ? (
                categories[type]?.map((category, index) => (
                  <Select.SelectItem
                    key={index}
                    value={`${category.name}+${category.icon}`}
                  >
                    <span className='flex items-center gap-3'>
                      <span>{allIconsData[category.icon]}</span>
                      {category.name}
                    </span>
                  </Select.SelectItem>
                ))
              ) : (
                <span className='px-5 text-sm text-muted-foreground'>
                  No Category Available
                </span>
              )}

              <div
                onClick={() => onTabChange('category')}
                className='my-2 rounded-md hover:bg-indigo-700 hover:text-white'
              >
                <div className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm'>
                  <FiPlus className='text-lg' /> Add new category
                </div>
              </div>
            </Select.SelectContent>
          </Select.Select>
        </div>
      </div>
      <div className='mt-5 space-y-3'>
        <Label>Wallet</Label>
        <Select.Select value={wallet} onValueChange={onWalletChange} required>
          <Select.SelectTrigger>
            <Select.SelectValue placeholder='Select Wallet' />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {wallets && Object.values(wallets).length > 0 ? (
              Object.values(wallets).map((wallet, index) => (
                <>
                  {type === 'revenue' ? (
                    <Select.SelectItem key={index} value={wallet.name}>
                      <span className='flex items-center gap-3'>
                        <span>{allIconsData[wallet.icon]}</span>
                        {wallet.name}
                      </span>
                    </Select.SelectItem>
                  ) : (
                    <>
                      {!wallet.saving && (
                        <Select.SelectItem key={index} value={wallet.name}>
                          <span className='flex items-center gap-3'>
                            <span>{allIconsData[wallet.icon]}</span>
                            {wallet.name}
                          </span>
                        </Select.SelectItem>
                      )}
                    </>
                  )}
                </>
              ))
            ) : (
              <span className='px-5 text-sm text-muted-foreground'>
                No Wallet Available
              </span>
            )}
            <div
              onClick={onAddWalletButtonPress}
              className='my-2 rounded-md hover:bg-indigo-700 hover:text-white'
            >
              <div className='flex cursor-pointer items-center gap-2 px-5 py-2 text-sm'>
                <FiPlus className='text-lg' /> Add new wallet
              </div>
            </div>
          </Select.SelectContent>
        </Select.Select>
      </div>
      <div className='mt-5 space-y-3'>
        <Label>Description</Label>
        <Textarea name='description' placeholder='Write a short description' />
      </div>
      {isLoading ? (
        <div className='ml-auto mt-8 w-fit rounded-md border px-3 py-2'>
          <Loader />
        </div>
      ) : (
        <Button className='ml-auto mt-8 block'>Add Transaction</Button>
      )}
    </form>
  );
}
