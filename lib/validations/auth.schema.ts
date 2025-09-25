import { z, ZodType } from 'zod/v4';

export type UserRegistrationProps = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  yourLocation: string;
  yourDestination: string;
  // joinedAs: 'owner' | 'customer';
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    fullName: z
      .string()
      .min(4, { message: 'your full name must be atleast 4 characters long' }),
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'You must enter a 6 digit code' }),
    yourLocation: z
      .string({ message: 'Please enter your location' })
      .nonempty({ message: 'Please enter your location' }),
    yourDestination: z
      .string({ message: 'Please enter your destination' })
      .nonempty({ message: 'Please enter your destination' }),
    // joinedAs: z.enum(['owner', 'customer'], {
    //   errorMap: () => ({ message: 'Please select a valid option' }),
    // }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  });
// .refine((schema) => schema.email === schema.confirmEmail, {
//   message: 'Your emails not match',
//   path: ['confirmEmail'],
// });

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'You did not enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Your password must be atleast 8 characters long' })
    .max(64, {
      message: 'Your password can not be longer then 64 characters long',
    }),
});

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  });

export const SignUpCompleteSchema = z.object({
  yourLocation: z
    .string({ message: 'Please enter your location' })
    .nonempty({ message: 'Please enter your location' }),
  yourDestination: z
    .string({ message: 'Please enter your destination' })
    .nonempty({ message: 'Please enter your destination' }),
  // joinedAs: z.enum(['owner', 'customer'], {
  //   errorMap: () => ({ message: 'Please select a valid option' }),
  // }),
});

export const ForgotPasswordSchema = z
  .object({
    email: z.string().email({ message: 'Incorrect email format' }),
    password: z
      .string()
      .min(8, { message: 'Your password must be atleast 8 characters long' })
      .max(64, {
        message: 'Your password can not be longer then 64 characters long',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'password should contain only alphabets and numbers'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'You must enter a 6 digit code' }),
    totp: z
      .string()
      .min(6, { message: 'You must enter a 6 digit code' })
      .optional(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'],
  });

// Exporting the inferred types from the schemas
export type UserRegistrationValues = z.infer<typeof UserRegistrationSchema>;
export type UserLoginValues = z.infer<typeof UserLoginSchema>;
export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;
export type SignUpCompleteValues = z.infer<typeof SignUpCompleteSchema>;
export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;
