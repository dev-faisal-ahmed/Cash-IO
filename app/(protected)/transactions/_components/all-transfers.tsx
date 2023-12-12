'use client';
import * as Card from '@/components/ui/card';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetTransfersQuery } from '@/redux/services/api';
import { TransferContainer } from './transfer-container';

export function AllTransfers() {
  const { user } = useGetUser();
  const { data: transfers, isLoading } = useGetTransfersQuery(user?.email!);

  if (isLoading)
    return (
      <div className='col-span-2 mt-6 flex min-h-[400px] items-center justify-center rounded-md border md:mt-0'>
        <Loader />
      </div>
    );

  return (
    <section className='col-span-2 mt-6 md:mt-0'>
      <Card.Card className='border border-gray-400 bg-transparent dark:border-white'>
        <Card.CardHeader className='pb-3'>
          <Card.CardTitle className=''>All Transfers</Card.CardTitle>
        </Card.CardHeader>
        {transfers && transfers.length > 0 ? (
          <Card.CardContent className='mt-5 space-y-4 px-6'>
            {transfers.map((data) => (
              <TransferContainer
                key={data._id}
                _id={data._id}
                amount={data.amount}
                date={data.date}
                from={data.from}
                to={data.to}
                icon={data.icon}
              />
            ))}
          </Card.CardContent>
        ) : (
          <p className='mb-3 px-6 text-muted-foreground'>Nothing to show</p>
        )}
      </Card.Card>
    </section>
  );
}
