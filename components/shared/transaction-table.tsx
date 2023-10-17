import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TransactionType } from '@/lib/types';

type TransactionTableProps = {
  transactions: TransactionType[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
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
            <TableCell className='whitespace-nowrap font-medium'>
              <span className='text-2xl'>{transaction.categoryIcon} </span>
              <span className='ml-2'>{transaction.category}</span>
            </TableCell>
            <TableCell>{transaction.wallet}</TableCell>
            <TableCell>
              <span className='truncate whitespace-break-spaces'>
                {transaction.description}
              </span>
              <span className='mt-1 block text-xs text-muted-foreground'>
                {JSON.stringify(transaction.date)}
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
