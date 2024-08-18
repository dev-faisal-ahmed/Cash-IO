import { z } from 'zod';

export const addWalletSchema = z.object({
  name: z.string({ required_error: 'Wallet Name is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
  saving: z.boolean().optional(),
});
