import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Minimum length of userName is 2' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Minimum password length is 4' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Minimum password length is 4' }),
});

export const googleLoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, { message: 'Minimum length of userName is 2' }),
  imageUrl: z
    .string({ required_error: 'ImageUrl is required' })
    .min(1, { message: 'ImageUrl is required' }),
});
