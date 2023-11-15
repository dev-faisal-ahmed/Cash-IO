'use client';
import * as Select from '@/components/ui/select';
import { useState } from 'react';
import { DashboardPieChart } from './dashboard-pie-chart';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetCategoriesSummaryQuery } from '@/redux/services/api';
import { pieChartFillColors } from '@/data/pie-chart-fill-colors';

type SelectedType = 'expense' | 'revenue';

export function DashboardPieChartContainer() {
  const [type, setType] = useState<SelectedType>('expense');
  const { user } = useGetUser();
  const { data: categorySummary } = useGetCategoriesSummaryQuery(user?.email!);

  return (
    <div className='rounded-md border border-gray-400 p-5 dark:border-white md:col-span-2'>
      <Select.Select onValueChange={(value) => setType(value as SelectedType)}>
        <Select.SelectTrigger className='ml-auto w-fit min-w-[230px] border border-gray-400 bg-transparent dark:border-white dark:bg-[#2f2f2f]'>
          <Select.SelectValue
            defaultValue={'expense'}
            placeholder='Select Any Category'
          />
        </Select.SelectTrigger>
        <Select.SelectContent className='dark:bg-[#2f2f2f]'>
          <Select.SelectItem value='expense'>Expense</Select.SelectItem>
          <Select.SelectItem value='revenue'>Revenue</Select.SelectItem>
        </Select.SelectContent>
      </Select.Select>

      {categorySummary && categorySummary?.[type].categories.length > 0 ? (
        <DashboardPieChart categories={categorySummary?.[type].categories} />
      ) : (
        <div className='flex min-h-[400px] items-center justify-center font-bold'>
          No Data Found
        </div>
      )}
      {categorySummary && categorySummary?.[type].categories.length > 0 && (
        <div className='flex flex-wrap items-center justify-center gap-5'>
          {categorySummary[type].categories.map(({ name }, index) => (
            <div className='flex items-center gap-3' key={index}>
              <div
                className='h-5 w-5 rounded'
                style={{
                  backgroundColor:
                    pieChartFillColors[index % pieChartFillColors.length],
                }}
              ></div>
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
