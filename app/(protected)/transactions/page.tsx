import { MonthlyTransactions } from './_components/monthly-transactions';
import { AllTransfers } from './_components/all-transfers';

export const dynamic = 'force-dynamic';

export default function TransactionsPage() {
  return (
    <section className='grid-cols-5 gap-6 md:grid'>
      <MonthlyTransactions />
      <AllTransfers />
    </section>
  );
}
