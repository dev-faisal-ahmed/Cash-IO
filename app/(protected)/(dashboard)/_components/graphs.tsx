'use client';

import { twMerge } from 'tailwind-merge';
import { DashboardBarChart } from './dashboard-bar-chart';
import { useState } from 'react';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';

type SelectedType = 'daily' | 'monthly' | 'categorized';

export function Graphs({ className }: { className?: string }) {
  const [selected, setSelected] = useState<SelectedType>('daily');

  return (
    <section className={twMerge(`px-5 ${className}`)}>
      <Select onValueChange={(value) => setSelected(value as SelectedType)}>
        <SelectTrigger className='ml-auto w-fit min-w-[230px] dark:bg-[#2f2f2f]'>
          <SelectValue placeholder='Select Any Category' />
        </SelectTrigger>
        <SelectContent className='dark:bg-[#2f2f2f]'>
          <SelectItem value='daily'>Daily</SelectItem>
          <SelectItem value='monthly'>Monthly</SelectItem>
          <SelectItem value='categorized'>Categorized</SelectItem>
        </SelectContent>
      </Select>
      <DashboardBarChart />
    </section>
  );
}
