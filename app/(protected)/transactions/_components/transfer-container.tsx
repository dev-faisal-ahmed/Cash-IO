import { TransferType } from '@/lib/types';

export function TransferContainer({ from, to, amount, date }: TransferType) {
  return (
    <div className='space-y-8'>
      <div className='flex gap-3'>
        <p className='text-sm'>{date}</p>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-semibold leading-none'>From: {from}</p>
          <p className='text-sm text-muted-foreground'>To: {to}</p>
        </div>
        <div className='ml-auto font-semibold'>
          &#2547;{amount ? amount : 0}
        </div>
      </div>
    </div>
  );
}
