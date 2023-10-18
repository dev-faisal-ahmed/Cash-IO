'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className='border bg-transparent '>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='w-fit rounded-md border p-5 text-2xl'>
            {allIconsData[icon]}
          </span>
          <div className='flex items-center justify-between gap-3'>
            {name}
            <WalletContainerMenu name={name} icon={icon} _id={_id} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
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
      </CardContent>
    </Card>
  );
}
