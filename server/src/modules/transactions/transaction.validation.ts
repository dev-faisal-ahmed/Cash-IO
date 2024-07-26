import { z } from 'zod';
import { transactionTypes } from './transaction.constants';

const CreateTransaction = z.object({
  walletId: z.string({ required_error: 'Wallet Id is required' }),
  sourceId: z.string({ required_error: 'Source Id is required' }),
  amount: z.number({ required_error: 'Amount is required' }),
  type: z.enum([...(transactionTypes as [string, ...string[]])]),
  date: z.number({ required_error: 'Date is required' }),
  fee: z.number().optional(),
});

export const transactionValidation = { CreateTransaction };

export type TCreateTransactionPayload = z.infer<typeof CreateTransaction>;
