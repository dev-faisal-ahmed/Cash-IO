import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type SummaryProps = {
  title: string;
  icon: ReactNode;
  value: string;
};

export function Summary({ title, icon, value }: SummaryProps) {
  return (
    <Card className='w-full text-gray-800 dark:border-gray-700 dark:bg-[#2f2f2f] dark:text-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-4 '>
        <CardTitle className=''>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-4xl font-bold'> &#2547;{value}</div>
      </CardContent>
    </Card>
  );
}
