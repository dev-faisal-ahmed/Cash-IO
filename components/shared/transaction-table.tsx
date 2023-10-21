'use client';
import * as Table from '@/components/ui/table';
import { useGetIcons } from '@/hooks/use-get-icons';
import { TransactionType } from '@/lib/data-types';
import { format } from 'date-fns';

type TransactionTableProps = {
  transactions: TransactionType[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { allIconsData } = useGetIcons();
  return (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          <Table.TableHead className='px-1'>Category</Table.TableHead>
          <Table.TableHead>Wallet</Table.TableHead>
          <Table.TableHead>Detail</Table.TableHead>
          <Table.TableHead className='text-right'>Amount</Table.TableHead>
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody>
        {transactions &&
          transactions.map((transaction, index) => (
            <Table.TableRow key={index}>
              <Table.TableCell className='flex h-full min-h-[100px] items-center gap-3 whitespace-nowrap font-medium'>
                <span className='text-2xl'>
                  {allIconsData[transaction.icon]}
                </span>
                <span>{transaction.category}</span>
              </Table.TableCell>
              <Table.TableCell>{transaction.wallet}</Table.TableCell>
              <Table.TableCell>
                <span className='truncate whitespace-break-spaces'>
                  {transaction.description}
                </span>
                <span className='mt-1 block text-xs text-muted-foreground'>
                  {format(new Date(transaction.date), 'do MMM, uu')}
                </span>
              </Table.TableCell>
              <Table.TableCell className='whitespace-nowrap text-right font-semibold'>
                {transaction.type === 'revenue' ? '+ ' : '- '}
                &#2547;{transaction.amount}
              </Table.TableCell>
            </Table.TableRow>
          ))}
      </Table.TableBody>
    </Table.Table>
  );
}
