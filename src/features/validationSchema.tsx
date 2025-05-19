import { z } from 'zod';

export const changePasswordSchema = z
  .object({
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
    confirm_password: z.string(),
  })
  .refine((data) => data.password_new === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match.',
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
export const registerSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'First name is required.' }),

    last_name: z
    .string()
    .min(1, { message: 'Last name is required.' }),

  role: z
    .enum(['Instructor', 'Student'], {
      errorMap: () => ({ message: 'Role must be either student or instructor.' }),
    }),

  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email address.',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .regex(/^(?=\S)(?=(.*\d.*){1})(?=.*[a-z]).{6,}$/, {
      message: 'Password must contain at least one lowercase letter and one number.',
    }),
});
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
