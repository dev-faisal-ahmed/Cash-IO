import { TransactionTable } from '@/components/shared/transaction-table';
import { TransactionType } from '@/lib/data-types';

type TransactionContainerProps = {
  month: string;
  transaction: TransactionType[];
};

export function TransactionContainer({
  month,
  transaction,
}: TransactionContainerProps) {
  return (
    <section className='rounded-lg border border-gray-400 p-5 pb-1 dark:border-white'>
      <div className='text-2xl font-bold tracking-tight'>Month : {month}</div>
      <TransactionTable transactions={transaction} />
    </section>
  );
}
