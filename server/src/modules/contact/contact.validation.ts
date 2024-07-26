import { z } from 'zod';

const CreateContact = z.object({
  name: z.string({ required_error: 'Name is required' }),
  phone: z.string({ required_error: 'Phone Number is required' }),
});

export const contactValidation = { CreateContact };

export type TCreateContactPayload = z.infer<typeof CreateContact>;
