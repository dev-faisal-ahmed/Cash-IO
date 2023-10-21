import { allIconsData } from '@/data/all-icons-data';
import { TransferType } from '@/lib/data-types';
import { format } from 'date-fns';

export function TransferContainer({
  from,
  to,
  amount,
  date,
  icon,
}: TransferType) {
  return (
    <div className='space-y-8'>
      <div className='flex gap-3'>
        <p className='text-xl'>{allIconsData[icon]}</p>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-semibold leading-none'>From: {from}</p>
          <p className='text-sm text-muted-foreground'>
            <p className='text-sm text-muted-foreground'>To: {to}</p>
            {format(new Date(date), 'do MMM, uu')}
          </p>
        </div>
        <div className='ml-auto font-semibold'>
          &#2547;{amount ? amount : 0}
        </div>
      </div>
    </div>
  );
}
