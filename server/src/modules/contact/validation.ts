import { z } from 'zod';

export const createContactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Minimum Length of Name is 2' }),
  phone: z
    .string({ required_error: 'Phone Number is required' })
    .min(11, { message: 'Invalid Phone Number' }),
});

export const updateContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Minimum Length of Name is 2' })
    .optional(),
  phone: z.string().min(11, { message: 'Invalid Phone Number' }).optional(),
});
