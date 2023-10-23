'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { indigo } from 'tailwindcss/colors';

type DashboardBarChartProps = {
  transactions: {
    date: string;
    amount: number;
  }[];
};

export function DashboardBarChart({ transactions }: DashboardBarChartProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={transactions}>
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
        <Bar dataKey='amount' fill={indigo[700]} radius={[15, 15, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
