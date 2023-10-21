'use client';
import * as Card from '@/components/ui/card';
import { Loader } from '@/components/shared/loader';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetTransfersQuery } from '@/redux/services/api';
import { TransferContainer } from './transfer-container';

export function AllTransfers() {
  const { user } = useGetUser();
  const {
    data: transfers,
    isFetching,
    isLoading,
  } = useGetTransfersQuery(user?.email!);

  if (isFetching || isLoading)
    return (
      <div className='col-span-2 mt-6 flex h-[350px] items-center justify-center rounded-md border md:mt-0'>
        <Loader />
      </div>
    );

  return (
    <section className='col-span-2 mt-6 md:mt-0'>
      <Card.Card className='border bg-transparent '>
        <Card.CardHeader>
          <Card.CardTitle className='mb-5'>All Transfers</Card.CardTitle>
          <Card.CardContent className='space-y-4 px-0'>
            {transfers &&
              transfers.map((data) => (
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
        </Card.CardHeader>
      </Card.Card>
    </section>
  );
}
