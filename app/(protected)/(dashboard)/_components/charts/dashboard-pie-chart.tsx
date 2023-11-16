'use client';

import { pieChartFillColors } from '@/data/pie-chart-fill-colors';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

type DashboardPieChartProps = {
  className?: string;
  categories: { name: string; amount: number }[];
};

export function DashboardPieChart({
  className,
  categories,
}: DashboardPieChartProps) {
  return (
    <>
      {categories.length > 0 ? (
        <div className={className}>
          <ResponsiveContainer height={400}>
            <PieChart>
              <Tooltip />
              <Pie
                className='w-full'
                data={categories}
                cx={'50%'}
                cy={'%50'}
                outerRadius={120}
                innerRadius={90}
                dataKey={'amount'}
                nameKey={'name'}
                paddingAngle={8}
                label
              >
                {categories.map((data, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieChartFillColors[index % pieChartFillColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className='flex min-h-[400px] items-center justify-center text-xl font-semibold'>
          Nothing to Show
        </div>
      )}
    </>
  );
}
