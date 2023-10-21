'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetIcons } from '@/hooks/use-get-icons';
import { TransactionType } from '@/lib/data-types';
import { format } from 'date-fns';

type TransactionTableProps = {
  transactions: TransactionType[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { allIconsData } = useGetIcons();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='px-1'>Category</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead>Detail</TableHead>
          <TableHead className='text-right'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className='flex h-full min-h-[100px] items-center gap-3 whitespace-nowrap font-medium'>
              <span className='text-2xl'>{allIconsData[transaction.icon]}</span>
              <span>{transaction.category}</span>
            </TableCell>
            <TableCell>{transaction.wallet}</TableCell>
            <TableCell>
              <span className='truncate whitespace-break-spaces'>
                {transaction.description}
              </span>
              <span className='mt-1 block text-xs text-muted-foreground'>
                {format(new Date(transaction.date), 'PPP')}
              </span>
            </TableCell>
            <TableCell className='whitespace-nowrap text-right font-semibold'>
              {transaction.type === 'revenue' ? '+ ' : '- '}
              &#2547;{transaction.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
