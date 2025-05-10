import { z } from 'zod';

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .regex(/^(?=\S)(?=(.*\d.*){1})(?=.*[a-z]).{6,}$/, {
      message: 'Password must contain at least one lowercase letter and one number.',
    }),
  password_new: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .regex(/^(?=\S)(?=(.*\d.*){1})(?=.*[a-z]).{6,}$/, {
      message: 'Password must contain at least one lowercase letter and one number.',
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email address.'
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .regex(/^(?=\S)(?=(.*\d.*){1})(?=.*[a-z]).{6,}$/, {
      message: 'Password must contain at least one lowercase letter and one number.',
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
