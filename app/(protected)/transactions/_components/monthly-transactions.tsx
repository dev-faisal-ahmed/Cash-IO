'use client';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetMonthlyTransactionsQuery } from '@/redux/services/api';
import { TransactionContainer } from './transaction-container';

export function MonthlyTransactions() {
  const { user } = useGetUser();
  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetMonthlyTransactionsQuery(user?.email!);

  if (isLoading || isFetching)
    return (
      <div className='col-span-3 flex h-[550px] items-center justify-center rounded-md border'>
        <Loader />
      </div>
    );

  return (
    <section className='col-span-3 space-y-6'>
      {transactions ? (
        Object.keys(transactions).map((key) => (
          <TransactionContainer
            key={key}
            month={key}
            transaction={transactions[key]}
          />
        ))
      ) : (
        <div className='rounded-lg border border-gray-400 p-5 dark:border-white'>
          <h3 className='text-2xl font-bold leading-tight'>
            Month Wise Transactions
          </h3>
          <p className='mt-2 text-muted-foreground'>Noting to show</p>
        </div>
      )}
    </section>
  );
}
