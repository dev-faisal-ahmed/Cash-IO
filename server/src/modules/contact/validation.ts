import { z } from 'zod';

const SCreateContact = z.object({
  name: z.string({ required_error: 'Name is required' }),
  phone: z.string({ required_error: 'Phone Number is required' }),
});

const SUpdateContact = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export const ContactValidation = { SCreateContact, SUpdateContact };

export type TCreateContactPayload = z.infer<typeof SCreateContact>;
export type TUpdateContactPayload = z.infer<typeof SUpdateContact>;
