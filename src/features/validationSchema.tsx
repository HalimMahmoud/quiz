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

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
