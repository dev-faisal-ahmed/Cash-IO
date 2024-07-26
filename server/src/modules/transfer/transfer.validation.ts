import { z } from 'zod';

const CreateTransfer = z.object({
  receiverWalletId: z.string({
    required_error: 'Receiver Wallet id is required',
  }),

  senderWalletId: z.string({
    required_error: 'Sender Wallet id is required',
  }),

  amount: z.number({ required_error: 'Amount is required' }).min(0),
  date: z.number({ required_error: 'Date is required' }),
  fee: z.number().min(0).optional(),
});

export const transferValidation = { CreateTransfer };

export type TCreateTransferPayload = z.infer<typeof CreateTransfer>;
