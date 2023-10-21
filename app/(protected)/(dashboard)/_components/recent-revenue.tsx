'use client';
import * as Card from '@/components/ui/card';
import { Revenue } from './revenue';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetTransactionsQuery } from '@/redux/services/api';
import { Loader } from '@/components/shared/loader';

export function RecentRevenue() {
  const { user } = useGetUser();
  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery(user?.email!);

  if (isLoading || isFetching)
    return (
      <div className='col-span-2 mt-6 flex h-[600px] items-center justify-center rounded-lg border md:mt-0'>
        <Loader />
      </div>
    );

  return (
    <Card.Card className='col-span-2 mt-6 h-fit overflow-y-auto bg-transparent p-5  text-gray-800 dark:text-white md:mt-0'>
      <Card.CardTitle>Recent Revenue</Card.CardTitle>
      <Card.CardContent className='mt-6 space-y-5 px-0'>
        {transactions?.revenue ? (
          transactions.revenue.map((revenue, index) => (
            <Revenue
              key={index}
              title={revenue.category}
              icon={revenue.icon}
              amount={revenue.amount}
              date={revenue.date}
            />
          ))
        ) : (
          <div className='mt-6 text-2xl font-semibold'>Nothing to show</div>
        )}
      </Card.CardContent>
    </Card.Card>
  );
}
