'use client';
import * as Select from '@/components/ui/select';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DashboardBarChart } from './dashboard-bar-chart';

type SelectedType = 'daily' | 'monthly' | 'categorized';

export function Graphs({ className }: { className?: string }) {
  const [selected, setSelected] = useState<SelectedType>('daily');

  return (
    <section className={twMerge(`px-5 ${className}`)}>
      <Select.Select
        onValueChange={(value) => setSelected(value as SelectedType)}
      >
        <Select.SelectTrigger className='ml-auto w-fit min-w-[230px] border border-gray-400 bg-transparent dark:border-white dark:bg-[#2f2f2f]'>
          <Select.SelectValue placeholder='Select Any Category' />
        </Select.SelectTrigger>
        <Select.SelectContent className='dark:bg-[#2f2f2f]'>
          <Select.SelectItem value='daily'>Daily</Select.SelectItem>
          <Select.SelectItem value='monthly'>Monthly</Select.SelectItem>
          <Select.SelectItem value='categorized'>Categorized</Select.SelectItem>
        </Select.SelectContent>
      </Select.Select>
      <div className='h-5' />
      <DashboardBarChart />
    </section>
  );
}
