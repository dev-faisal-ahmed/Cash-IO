'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WalletType } from '@/lib/types';
import { WalletContainerMenu } from './wallet-container-menu';

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
          {icon} {name}
          <WalletContainerMenu name={name} icon={icon} _id={_id} />
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
