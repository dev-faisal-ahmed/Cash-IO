'use client';
import { Loader } from '@/components/shared/loader';
import { TransactionTable } from '@/components/shared/transaction-table';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetTransactionsQuery } from '@/redux/services/api';

export function RecentExpenses() {
  const { user } = useGetUser();
  const { data: transactionsData, isLoading } = useGetTransactionsQuery(
    user?.email!,
  );

  if (isLoading)
    return (
      <div className='mt-6 flex min-h-[300px] w-full items-center justify-center rounded-lg border border-gray-400 dark:border-white md:col-span-3'>
        <Loader />
      </div>
    );

  return (
    <section className='col-span-3 space-y-5 rounded-md border border-gray-400 px-5 pb-2 pt-5 dark:border-white '>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Recent Expense</h2>
        {transactionsData && transactionsData.expense.length > 0 ? (
          <p className='mt-2 text-muted-foreground'>
            Here&apos;s the recent expenses
          </p>
        ) : (
          <p className='mt-2 text-muted-foreground'>Nothing to show</p>
        )}
      </div>
      {transactionsData && transactionsData.expense.length > 0 && (
        <TransactionTable transactions={transactionsData?.expense} />
      )}
    </section>
  );
}
