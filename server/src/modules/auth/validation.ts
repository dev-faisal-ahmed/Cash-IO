import { z } from 'zod';

const SRegister = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string({ required_error: 'Password is required' }),
});

const SLogin = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string({ required_error: 'Password is required' }),
});

const SGoogleLogin = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  name: z.string({ required_error: 'Name is required' }),
  imageUrl: z.string({ required_error: 'ImageUrl is required' }),
});

export const AuthValidation = { SRegister, SLogin, SGoogleLogin };

// types
export type TRegisterPayload = z.infer<typeof SRegister>;
export type TLoginPayload = z.infer<typeof SLogin>;
export type TGoogleLoginPayload = z.infer<typeof SGoogleLogin>;
