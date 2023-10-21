'use client';

import * as Card from '@/components/ui/card';
import { WalletType } from '@/lib/types';
import { WalletContainerMenu } from './wallet-container-menu';
import { allIconsData } from '@/data/all-icons-data';

export function WalletContainer({
  _id,
  name,
  expense,
  revenue,
  icon,
}: WalletType) {
  return (
    <Card.Card className='border bg-transparent '>
      <Card.CardHeader>
        <Card.CardTitle className='flex items-center justify-between text-xl'>
          <span className='w-fit rounded-md border p-3 text-xl'>
            {allIconsData[icon]}
          </span>
          <div className='flex items-center justify-between gap-4'>
            {name}
            <WalletContainerMenu
              name={name}
              icon={icon}
              _id={_id}
              balance={revenue - expense}
            />
          </div>
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
