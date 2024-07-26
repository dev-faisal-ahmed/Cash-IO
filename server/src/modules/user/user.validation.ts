import { z } from 'zod';

const RegisterUser = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
});

const LoginUser = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
});

const UpdateProfile = z.object({
  name: z.string().optional(),
  currency: z.string().optional(),
});

export const userValidation = { RegisterUser, LoginUser, UpdateProfile };

export type TRegistrationPayload = z.infer<typeof RegisterUser>;
export type TLoginPayload = z.infer<typeof LoginUser>;
export type TUpdateProfilePayload = z.infer<typeof UpdateProfile>;
