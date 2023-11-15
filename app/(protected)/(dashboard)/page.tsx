import { DashboardPieChart } from './_components/charts/dashboard-pie-chart';
import { DashboardPieChartContainer } from './_components/charts/dashboard-pie-chart-container';
import { Graphs } from './_components/charts/graphs';
import { RecentExpenses } from './_components/revenue-expense/recent-expenses';
import { RecentRevenue } from './_components/revenue-expense/recent-revenue';
import { WalletSummary } from './_components/summary/wallet-summary';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <WalletSummary />
      <section className='mt-6 grid-cols-5 gap-6 space-y-6 overflow-y-auto md:grid md:space-y-0'>
        <Graphs className='rounded-md border border-gray-400 py-5 dark:border-white md:col-span-3' />
        <DashboardPieChartContainer />
        <RecentExpenses />
        <RecentRevenue />
      </section>
    </>
  );
}
