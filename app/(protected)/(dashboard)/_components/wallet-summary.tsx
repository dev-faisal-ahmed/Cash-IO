'use client';
import * as Select from '@/components/ui/select';
import { useState } from 'react';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetWalletForTransactionQuery } from '@/redux/services/api';
import { Summary } from './summary';
import { FaBalanceScale } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SlGraph } from 'react-icons/sl';
import { getSummaryData } from '@/helpers/helper-functions';

export function WalletSummary() {
  const { user } = useGetUser();
  const {
    data: wallets,
    isLoading,
    isFetching,
  } = useGetWalletForTransactionQuery(user?.email!);
  const [selected, setSelected] = useState('all');

  if (isLoading || isFetching)
    return (
      <div className='flex h-[200px] items-center justify-center rounded-md border border-gray-400 dark:border-white'>
        <Loader />
      </div>
    );

  return (
    <>
      <div className='flex items-center'>
        <h3 className='hidden text-xl font-semibold md:block'>
          Summary of {selected === 'all' ? 'Over All Wallets' : selected}{' '}
        </h3>
        <Select.Select onValueChange={(value) => setSelected(value)}>
          <Select.SelectTrigger className='ml-auto w-fit min-w-[230px] border border-gray-400 bg-transparent dark:border-white dark:bg-[#2f2f2f]'>
            <Select.SelectValue placeholder='Select Any Category' />
          </Select.SelectTrigger>
          <Select.SelectContent className='dark:bg-[#2f2f2f]'>
            {wallets ? (
              <>
                <Select.SelectItem value='all'>Over All</Select.SelectItem>
                {Object.values(wallets).map((wallet, index) => (
                  <Select.SelectItem key={index} value={wallet.name}>
                    {wallet.name}
                  </Select.SelectItem>
                ))}
              </>
            ) : (
              <span className='px-3 text-sm text-muted-foreground'>
                No Wallet Available
              </span>
            )}
          </Select.SelectContent>
        </Select.Select>
      </div>

      <div className='mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <Summary
          title='Total Balance'
          value={getSummaryData(selected, wallets).balance.toString()}
          icon={<FaBalanceScale size={20} />}
        />
        <Summary
          title='Total Revenue'
          value={getSummaryData(selected, wallets).revenue.toString()}
          icon={<FaMoneyBillTrendUp size={20} />}
        />
        <Summary
          title='Total Expenses'
          value={getSummaryData(selected, wallets).expense.toString()}
          icon={<SlGraph size={20} />}
        />
      </div>
    </>
  );
}
