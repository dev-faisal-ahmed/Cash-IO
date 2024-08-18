import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  phone: z.string({ required_error: 'Phone Number is required' }),
});

export const updateContactSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});
