'use client';
import * as Card from '@/components/ui/card';
import { WalletType } from '@/lib/data-types';
import { WalletContainerMenu } from './wallet-container-menu';
import { allIconsData } from '@/data/all-icons-data';

export function WalletContainer({
  _id,
  name,
  expense,
  revenue,
  icon,
}: Omit<WalletType, 'email'>) {
  return (
    <Card.Card className='border border-gray-400 bg-transparent dark:border-white'>
      <Card.CardHeader>
        <Card.CardTitle className='grid grid-cols-[auto_1fr_auto] items-center justify-between gap-3 text-xl'>
          <span className='w-fit rounded-md bg-indigo-700 p-2 text-lg text-white xl:p-3 xl:text-2xl'>
            {allIconsData[icon]}
          </span>
          <div className='truncate'>{name}</div>
          <WalletContainerMenu
            name={name}
            icon={icon}
            _id={_id}
            balance={revenue - expense}
          />
        </Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent className='space-y-2'>
        <div className='flex'>
          <p>Revenue</p>
          <p className='ml-auto font-semibold'> &#2547; {revenue}</p>
        </div>
        <div className='flex'>
          <p>Expense</p>
          <p className='ml-auto font-semibold'> &#2547; {expense}</p>
        </div>
        <div className='flex'>
          <p>Balance</p>
          <p className='ml-auto font-semibold'>
            &#2547; {(revenue | 0) - (expense | 0)}
          </p>
        </div>
      </Card.CardContent>
    </Card.Card>
  );
}
