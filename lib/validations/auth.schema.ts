import { z, ZodType } from 'zod';

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

export const userRegistrationSchema = z
  .object({
    firstName: z.string().min(2, { error: 'Enter a valid first name' }),
    lastName: z.string().min(2, { error: 'Enter a valid last name' }),
    fullName: z.string().min(2, { error: 'Enter a valid full name' }),
    userName: z.string().min(1, { error: 'Enter a valid user name' }),
    email: z.email({ error: 'Incorrect email format' }),
    password: z
      .string()
      .min(8, { error: 'Your password must be atleast 8 characters long' })
      .max(64, {
        error: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { error: 'You must enter a 6 digit code' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signUpCompleteSchema = z.object({
  fromLocation: z.string().min(1, {
    error:
      'Enter your location (This will help us to connect you with local businesses)',
  }),
  countryOrNation: z
    .object({
      id: z.number({ error: 'Choose a country' }),
      name: z.string({ error: 'Choose a country' }),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          path: ['countryOrNation'],
          message: 'Choose a country',
        });
        ctx.aborted = true;
      }
      return;
    }),
  stateOrProvince: z
    .object({
      id: z.number({ error: 'Choose a state' }),
      name: z.string({ error: 'Choose a state' }),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          path: ['stateOrProvince'],
          message: 'Choose a state',
        });
        ctx.aborted = true;
      }
    }),
  cityOrTown: z
    .object({
      id: z.number({ error: 'Choose a city' }),
      name: z.string({ error: 'Choose a city' }),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          path: ['cityOrTown'],
          message: 'Choose a city',
        });
        ctx.aborted = true;
      }
    }),
});

export const UserLoginSchema = z.object({
  email: z.email({ error: 'You did not enter a valid email' }),
  password: z
    .string()
    .min(8, { error: 'Your password must be atleast 8 characters long' })
    .max(64, {
      error: 'Your password can not be longer then 64 characters long',
    }),
});

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Your password must be atleast 8 characters long' })
      .max(64, {
        error: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    error: 'passwords do not match',
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z
  .object({
    email: z.email({ error: 'Incorrect email format' }),
    password: z
      .string()
      .min(8, { error: 'Your password must be atleast 8 characters long' })
      .max(64, {
        error: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { error: 'You must enter a 6 digit code' }),
    totp: z
      .string()
      .min(6, { error: 'You must enter a 6 digit code' })
      .optional(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    error: 'passwords do not match',
    path: ['confirmPassword'],
  });

// Exporting the inferred types from the schemas
export type UserRegistrationValues = z.infer<typeof userRegistrationSchema>;
export type UserLoginValues = z.infer<typeof UserLoginSchema>;
export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;
export type SignUpCompleteValues = z.infer<typeof signUpCompleteSchema>;
export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;
