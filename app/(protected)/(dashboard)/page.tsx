import { Summary } from './_components/summary';
import { FaBalanceScale } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SlGraph } from 'react-icons/sl';
import { Graphs } from './_components/graphs';
import { RecentExpenses } from './_components/recent-expenses';
import { RecentRevenue } from './_components/recent-revenue';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <section className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <Summary
          title='Total Balance'
          value='500'
          icon={<FaBalanceScale size={20} />}
        />
        <Summary
          title='Total Expenses'
          value='300'
          icon={<SlGraph size={20} />}
        />
        <Summary
          title='Total Revenue'
          value='800'
          icon={<FaMoneyBillTrendUp size={20} />}
        />
      </section>
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
