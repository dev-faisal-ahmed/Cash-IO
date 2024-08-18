import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const googleLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  name: z.string({ required_error: 'Name is required' }),
  imageUrl: z.string({ required_error: 'ImageUrl is required' }),
});
