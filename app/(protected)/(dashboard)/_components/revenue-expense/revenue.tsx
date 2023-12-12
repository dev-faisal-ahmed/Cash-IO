'use client';

import { useGetIcons } from '@/hooks/use-get-icons';
import { format } from 'date-fns';

type RevenueProps = {
  title: string;
  icon: string;
  date: string;
  amount: number;
};

export function Revenue({ title, icon, date, amount }: RevenueProps) {
  const { allIconsData } = useGetIcons();
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-2'>
        <p className='rounded-md bg-indigo-700 p-2 text-2xl text-white'>
          {allIconsData[icon]}
        </p>
        <div className='ml-4 space-y-1'>
          <p className='font-semibold leading-none'>{title}</p>
          <p className='text-sm text-muted-foreground'>
            {format(new Date(date), 'do MMM, uu')}
          </p>
        </div>
        <div className='ml-auto font-semibold'>
          + &#2547;{amount ? amount : 0}
        </div>
      </div>
    </div>
  );
}
