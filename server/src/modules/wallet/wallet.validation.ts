import { string, z } from 'zod';

const CreateWallet = z.object({
  name: z.string({ required_error: 'Wallet Name is required' }),
  initialBalance: z.number().min(0).optional(),
  icon: z.object(
    {
      group: z.string({ required_error: 'Icon Group is required' }),
      name: z.string({ required_error: 'Icon Name is required' }),
    },
    { required_error: 'Icon is required' }
  ),
  saving: z.boolean().optional(),
});

const EditWallet = z.object({
  name: string().optional(),
  icon: z
    .object({
      group: z.string({ required_error: 'Icon Group is required' }),
      name: z.string({ required_error: 'Icon Name is required' }),
    })
    .optional(),
  saving: z.boolean().optional(),
});

export const walletValidation = { CreateWallet, EditWallet };
export type TCreateWalletPayload = z.infer<typeof CreateWallet>;
export type TEditWalletPayload = z.infer<typeof EditWallet>;
