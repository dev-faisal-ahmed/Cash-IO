import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Min length is 4' }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
