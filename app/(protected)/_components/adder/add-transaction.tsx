import * as Select from '@/components/ui/select';
import { FormInput } from '@/components/shared/form-input';
import { CategoriesTypeProps, WalletOptionType } from '@/lib/types';
import { useState } from 'react';
import { CalendarPopover } from '@/components/shared/calendar-popover';
import { Label } from '@/components/ui/label';
import { useGetIcons } from '@/hooks/use-get-icons';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type AddTransactionProps = {
  categories: CategoriesTypeProps;
  wallets: WalletOptionType[];
};

export function AddTransaction({ categories, wallets }: AddTransactionProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<'expense' | 'revenue'>('expense');
  const { allIconsData } = useGetIcons();

  function onTypeChange(value: string) {
    setType(value as 'expense' | 'revenue');
  }

  return (
    <form>
      <div className='flex items-center gap-5'>
        <FormInput
          title='Amount'
          placeholder='Enter amount'
          name='amount'
          type='number'
          required
        />
        <CalendarPopover date={date} setDate={setDate} />
      </div>
      <div className='mt-5 flex items-center gap-5'>
        <div className='w-full space-y-3'>
          <Label>Transaction Type</Label>
          <Select.Select value={type} onValueChange={onTypeChange}>
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
          <Select.Select>
            <Select.SelectTrigger>
              <Select.SelectValue placeholder='Select Category' />
            </Select.SelectTrigger>
            <Select.SelectContent>
              {categories[type]?.map((category, index) => (
                <Select.SelectItem key={index} value={category.name}>
                  <span className='flex items-center gap-3'>
                    <span>{allIconsData[category.icon]}</span>
                    {category.name}
                  </span>
                </Select.SelectItem>
              ))}
            </Select.SelectContent>
          </Select.Select>
        </div>
      </div>
      <div className='mt-5 space-y-3'>
        <Label>Wallet</Label>
        <Select.Select>
          <Select.SelectTrigger>
            <Select.SelectValue placeholder='Select Wallet' />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {wallets.map((wallet, index) => (
              <Select.SelectItem key={index} value={wallet.name}>
                <span className='flex items-center gap-3'>
                  <span>{allIconsData[wallet.icon]}</span>
                  {wallet.name}
                </span>
              </Select.SelectItem>
            ))}
          </Select.SelectContent>
        </Select.Select>
      </div>
      <div className='mt-5 space-y-3'>
        <Label>Description</Label>
        <Textarea placeholder='Write a short description' />
      </div>
      <Button className='ml-auto mt-8 block'>Add Transaction</Button>
    </form>
  );
}
