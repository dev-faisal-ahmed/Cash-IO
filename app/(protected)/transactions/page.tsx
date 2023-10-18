import { monthlyTransactionsData } from '@/data/monthly-transactions-data';
import { TransactionContainer } from './_components/transaction-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transferData } from '@/data/transfer-data';
import { TransferContainer } from './_components/transfer-container';

export default function TransactionsPage() {
  return (
    <section className='grid grid-cols-5 gap-6'>
      <section className='col-span-3 space-y-6'>
        {Object.keys(monthlyTransactionsData).map((key) => (
          <TransactionContainer
            key={key}
            month={key}
            transaction={monthlyTransactionsData[key]}
          />
        ))}
      </section>
      <section className='col-span-2'>
        <Card className='border bg-transparent '>
          <CardHeader>
            <CardTitle className='mb-5'>All Transfers</CardTitle>
            <CardContent className='space-y-4 px-0'>
              {transferData.map((data, index) => (
                <TransferContainer
                  key={index}
                  amount={data.amount}
                  date={data.date}
                  from={data.from}
                  to={data.to}
                />
              ))}
            </CardContent>
          </CardHeader>
        </Card>
      </section>
    </section>
  );
}
