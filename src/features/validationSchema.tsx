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
export const QuizSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'title is required.' }),

    description: z
    .string()
    .min(1, { message: 'description is required.' }),

    group: z
    .string()
    .min(1, { message: 'group is required.' }),

    questions_number: z
    .string()
    .min(1, { message: 'questions_number is required.' }),

    difficulty: z
    .string()
    .min(1, { message: 'difficulty is required.' }),

    type: z
    .string()
    .min(1, { message: 'type is required.' }),

    schadule: z
    .string()
    .min(1, { message: 'schadule is required.' }),

    duration: z
    .string()
    .min(1, { message: 'duration is required.' }),



    score_per_question: z
    .string()
    .min(1, { message: 'score_per_question is required.' }),


});
export type QuizFormData = z.infer<typeof QuizSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
