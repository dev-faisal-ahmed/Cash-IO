'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { indigo } from 'tailwindcss/colors';

type DashboardBarChartProps = {
  transactions: {
    date: string;
    expense: number;
    revenue: number;
  }[];
};

export function DashboardBarChart({ transactions }: DashboardBarChartProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={transactions}>
        <defs>
          <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='35%' stopColor={indigo[700]} stopOpacity={1} />
            <stop offset='60%' stopColor={indigo[800]} stopOpacity={1} />
            <stop offset='90%' stopColor={indigo[900]} stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='date'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='expense'
          fill={'url(#colorExpense)'}
          radius={[15, 15, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
