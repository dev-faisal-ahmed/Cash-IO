import { z } from 'zod';
import { transactionTypes } from './constants';
import { dateGenerator } from '../../helpers';

export const addTransactionSchema = z.object({
  walletId: z
    .string({ required_error: 'Wallet Id is required' })
    .min(24, { message: 'Invalid WalletId' }),
  categoryId: z
    .string({ required_error: 'Source Id is required' })
    .min(24, { message: 'Invalid CategoryId' }),
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(0, { message: 'Minimum Amount has to be more than zero' }),
  type: z.enum([...(transactionTypes as [string, ...string[]])]),
  date: dateGenerator('Date is required'),
  fee: z.number().optional(),
});

export const updateTransactionSchema = z.object({
  walletId: z.string().min(24, { message: 'Invalid WalletId' }).optional(),
  categoryId: z.string().min(24, { message: 'Invalid CategoryId' }).optional(),
  amount: z
    .number()
    .min(0, { message: 'Minimum amount needs to be more than 0' })
    .optional(),
  type: z.enum([...(transactionTypes as [string, ...string[]])]).optional(),
  date: dateGenerator('Date is required').optional(),
  fee: z.number().optional(),
});
