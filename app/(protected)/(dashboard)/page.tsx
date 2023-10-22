import { Graphs } from './_components/graphs';
import { RecentExpenses } from './_components/recent-expenses';
import { RecentRevenue } from './_components/recent-revenue';
import { WalletSummary } from './_components/wallet-summary';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <WalletSummary />
      <section className='mt-6 grid-cols-5 gap-6 overflow-y-auto md:grid'>
        <div className='col-span-3'>
          <Graphs className='rounded-md border border-gray-400 py-5 dark:border-white ' />
          <RecentExpenses />
        </div>
        <RecentRevenue />
      </section>
    </>
  );
}
