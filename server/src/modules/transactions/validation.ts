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
    .min(0, { message: 'Amount can not be negative' }),
  type: z.enum([...(transactionTypes as [string, ...string[]])]),
  date: dateGenerator('Date is required'),
  fee: z.number().min(0, { message: 'Fee can not be negative' }).optional(),
});

export const updateTransactionSchema = z.object({
  walletId: z.string().min(24, { message: 'Invalid WalletId' }).optional(),
  categoryId: z.string().min(24, { message: 'Invalid CategoryId' }).optional(),
  amount: z
    .number()
    .min(0, { message: 'Amount can not be negative' })
    .optional(),
  type: z.enum([...(transactionTypes as [string, ...string[]])]).optional(),
  date: dateGenerator('Date is required').optional(),
  fee: z.number().min(0, { message: 'Fee can not be negative' }).optional(),
});
