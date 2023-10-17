type RevenueProps = {
  title: string;
  icon: string;
  date: string;
  amount: number;
};

export function Revenue({ title, icon, date, amount }: RevenueProps) {
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-2'>
        <p className='text-2xl'>{icon}</p>
        <div className='ml-4 space-y-1'>
          <p className='font-semibold leading-none'>{title}</p>
          <p className='text-sm text-muted-foreground'>{date}</p>
        </div>
        <div className='ml-auto font-semibold'>
          + &#2547;{amount ? amount : 0}
        </div>
      </div>
    </div>
  );
}
