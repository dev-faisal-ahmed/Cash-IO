'use client';

import * as Select from '@/components/ui/select';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DashboardBarChart } from './dashboard-bar-chart';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetAllTransactionsQuery } from '@/redux/services/api';
import { Loader } from '@/components/shared/loader';
import {
  getDailyTransactionOnRanged,
  getMonthlyTransactions,
} from '@/helpers/helper-functions';

type SelectedType = 'daily' | 'monthly';

export function Graphs({ className }: { className?: string }) {
  const { user } = useGetUser();
  const { data: transactions, isLoading } = useGetAllTransactionsQuery(
    user?.email!,
  );
  const [selected, setSelected] = useState<SelectedType>('daily');

  if (isLoading)
    return (
      <div className='col-span-3 flex h-[350px] items-center justify-center rounded-md border border-gray-400 dark:border-white'>
        <Loader />
      </div>
    );

  return (
    <section
      className={twMerge(`px-5 ${className} flex flex-col justify-between`)}
    >
      <Select.Select
        onValueChange={(value) => setSelected(value as SelectedType)}
      >
        <Select.SelectTrigger className='ml-auto w-fit min-w-[230px] border border-gray-400 bg-transparent dark:border-white dark:bg-[#2f2f2f]'>
          <Select.SelectValue placeholder='Select Any Category' />
        </Select.SelectTrigger>
        <Select.SelectContent className='dark:bg-[#2f2f2f]'>
          <Select.SelectItem value='daily'>Daily</Select.SelectItem>
          <Select.SelectItem value='monthly'>Monthly</Select.SelectItem>
        </Select.SelectContent>
      </Select.Select>

      {selected === 'daily' && transactions && (
        <DashboardBarChart
          transactions={Object.values(
            getDailyTransactionOnRanged(transactions, 10),
          )}
        />
      )}
      {selected === 'monthly' && transactions && (
        <DashboardBarChart
          transactions={getMonthlyTransactions(transactions)}
        />
      )}
      {!transactions ||
        (transactions?.length === 0 && (
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-200/40 text-xl font-semibold tracking-tight dark:bg-black/40'>
            No Data Found
          </div>
        ))}
    </section>
  );
}
