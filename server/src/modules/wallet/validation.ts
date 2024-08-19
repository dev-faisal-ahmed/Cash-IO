import { z } from 'zod';

export const addWalletSchema = z.object({
  name: z
    .string({ required_error: 'Wallet Name is required' })
    .min(2, { message: 'Name is too short' }),
  icon: z
    .string({ required_error: 'Icon is required' })
    .min(2, { message: 'Invalid Icon' }),
  saving: z.boolean().optional(),
});
