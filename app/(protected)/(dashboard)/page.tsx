import { Metadata } from 'next';
import { Summary } from './_components/summary';
import { FaBalanceScale } from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { SlGraph } from 'react-icons/sl';
import { Graphs } from './_components/graphs';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Revenue } from './_components/revenue';
import { revenueData } from '@/data/revenue-data';

export const metadata: Metadata = {
  title: 'Cash-IO - Dashboard',
  description: 'Dashboard of users',
};

export default function Home() {
  return (
    <>
      <section className='grid grid-cols-3 gap-5'>
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
      <section
        style={{ height: 440 }}
        className='mt-5 grid  grid-cols-5 gap-5 overflow-y-auto'
      >
        <Graphs className='col-span-3 rounded-md border py-5 dark:border-gray-700' />
        <Card className='col-span-2 w-full overflow-y-auto bg-transparent p-5 text-gray-800 dark:border-gray-700 dark:text-white'>
          <CardTitle>Recent Revenue</CardTitle>
          <CardContent className='mt-6 space-y-5 px-0'>
            {revenueData.map((revenue, index) => (
              <Revenue
                key={index}
                title={revenue.title}
                icon={revenue.icon}
                amount={revenue.amount}
                date={revenue.date}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
