import { z } from 'zod';

export const appointmentSchema = z
  .object({
    startDate: z.coerce.date({
      required_error: 'A start date is required.',
    }),
    endDate: z.coerce.date({
      required_error: 'An end date is required.',
    }),
    guests: z.enum(['active', 'paused', 'delayed', 'cancelled'], {
      required_error: 'A guests is required.',
    }),
  })
  .superRefine((data, ctx) => {
    // Check if the start date is in the past
    if (data.startDate < new Date()) {
      ctx.addIssue({
        code: 'custom',
        message: 'Start date must be in the future.',
        path: ['startDate'],
      });
    }
    // Check if the start date is after the end date
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'End date must be after start date.',
        path: ['endDate'],
      });
    }
  });

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
