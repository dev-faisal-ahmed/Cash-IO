'use client';
import { Loader } from '@/components/shared/loader';
import { TransactionTable } from '@/components/shared/transaction-table';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetTransactionsQuery } from '@/redux/services/api';
import { useEffect } from 'react';

export function RecentExpenses() {
  const { user } = useGetUser();
  const { data: transactionsData, isLoading } = useGetTransactionsQuery(
    user?.email!,
  );

  useEffect(() => {});

  if (isLoading)
    return (
      <div className='mt-6 flex h-[300px] w-full items-center justify-center rounded-lg border'>
        <Loader />
      </div>
    );

  console.log(transactionsData);

  return (
    <section className='mt-6 space-y-5 rounded-md border px-5 pb-2 pt-5 '>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Recent Expense</h2>
        <p className='mt-2 text-muted-foreground'>
          Here&apos;s the recent expenses
        </p>
      </div>
      {transactionsData && (
        <TransactionTable transactions={transactionsData?.expense} />
      )}
    </section>
  );
}
