import { z } from 'zod';
import { transactionTypes } from './constants';
import { dateGenerator } from '../../helpers';

export const addTransactionSchema = z.object({
  walletId: z.string({ required_error: 'Wallet Id is required' }),
  categoryId: z.string({ required_error: 'Source Id is required' }),
  amount: z.number({ required_error: 'Amount is required' }),
  type: z.enum([...(transactionTypes as [string, ...string[]])]),
  date: dateGenerator('Date is required'),
  fee: z.number().optional(),
});
