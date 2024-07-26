import { z } from 'zod';
import { lendTypes } from './lend.constants';
import { TLendType } from './lend.interface';

const CreateLend = z.object({
  contactId: z.string({ required_error: 'ContactId is required' }),
  walletId: z.string({ required_error: 'WalletId is required' }),
  amount: z.number({ required_error: 'Amount is required' }),
  date: z.number({ required_error: 'Date is required is required' }),
  type: z.enum([...(lendTypes as [string, ...string[]])], {
    required_error:
      'Type is required and it has to be either "LEND" or "BORROW"',
  }),
  fee: z.number().optional(),
});

export const lendValidation = { CreateLend };

export type TCreateLendPayload = z.infer<typeof CreateLend> & {
  type: TLendType;
};
