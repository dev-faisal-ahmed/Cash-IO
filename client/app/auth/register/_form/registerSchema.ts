import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid Email' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(4, { message: 'Min length is 4' }),
    confirmPassword: z.string({
      required_error: 'Confirm Password is required',
    }),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
