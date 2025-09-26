import {
  hostLanguages,
  propertyAccomodationsEnum,
  propertyEnvironmentsEnum,
  propertyOwnershipsEnum,
  propertySurroundingsEnum,
  propertySwappingsEnum,
  propertyTypesEnum,
} from '@/constants';
import { emailRegex, validatePostalCode } from '@/lib/helpers';
import libphonenumber from 'google-libphonenumber';
import { z } from 'zod';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|in)$/;

const hostLanguageEnum = hostLanguages.map((language) => language.language) as [
  string,
  ...string[]
];

export const addPropertySchema = z.object({
  // 1.
  streetAddress: z.coerce
    .string()
    .min(1, {
      error: 'Street address must be 1 to 50 characters.',
    })
    .max(50, {
      error: 'Street address must be 1 to 50 characters.',
    }),
  countryOrNation: z
    .object({
      id: z.coerce.number(),
      name: z.coerce.string(),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          message: 'Choose a country',
        });
      }
    }),
  stateOrProvince: z
    .object({
      id: z.coerce.number(),
      name: z.coerce.string(),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          message: 'Choose a state',
        });
      }
    }),
  cityOrTown: z
    .object({
      id: z.coerce.number(),
      name: z.coerce.string(),
    })
    .superRefine((data, ctx) => {
      if (data.name.length < 1) {
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 1,
          inclusive: true,
          message: 'Choose a city',
        });
      }
    }),

  zipcode: z.coerce.string().superRefine((data, ctx) => {
    if (!validatePostalCode(data, 'IN')) {
      console.log('fail-status:', validatePostalCode(data, 'IN'));
      ctx.addIssue({
        code: 'invalid_format',
        format: 'postal-code',
        validation: 'regex',
        // path: ['zipcode'],
        // fatal: true,
        path: ['zipcode'],
        message: 'Invalid postal code',
      });
    } else {
      console.log('pass-status:', validatePostalCode(data, 'IN'));
    }
  }),
  // .suparRefine((data, ctx) => {
  //   if (validatePostalCode(data, 'IN')) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.invalid_string,
  //       validation: 'postalCode',
  //       fatal: true,
  //       message: 'Invalid postal code',
  //     });

  //   }
  // }),
  propertyArea: z.coerce
    .string()
    .min(1, { error: 'Property area is required' })
    .max(50, { error: 'Property area must be 1 to 50 characters.' }),
  propertyAreaUnit: z.coerce
    .string()
    .min(1, { error: 'Property area unit is required' })
    .max(50, { error: 'Property area unit must be 1 to 50 characters.' }),
  propertyDescription: z.coerce
    .string()
    .min(10, {
      error: 'Property description must be 10 character.',
    })
    .max(1000, {
      error: 'Property description max limit 1000 character.',
    }),

  // 2.
  propertyType: z.enum(propertyTypesEnum, {
    error: 'Please select a room type.',
  }),

  // 3.
  propertyOwnership: z.enum(propertyOwnershipsEnum, {
    error: 'Please select a room ownership.',
  }),

  // 4.
  propertySwapping: z.enum(propertySwappingsEnum, {
    error: 'Please select a swapping type.',
  }),

  // 5.
  propertyOwnerName: z.coerce
    .string()
    .optional()
    .superRefine((data, ctx) => {
      if (data) {
        if (data.length < 3) {
        }
        ctx.addIssue({
          code: 'too_small',
          origin: 'string',
          minimum: 3,
          inclusive: true,
          message: 'Owner name must be at least 3 characters',
        });
      }
    }),
  propertyOwnerEmail: z
    .email({
      error: 'Invalid email address',
      pattern: emailRegex,
    })
    .optional(),
  // propertyOwnerEmail: z.coerce
  //   .string()
  //   .optional()
  //   .superRefine((data, ctx) => {
  //     if (data) {
  //       // const isValidEmail = emailRegex.test(data);
  //       const isValidEmail = emailRegex.test(data);
  //       if (!isValidEmail) {
  //         ctx.addIssue({
  //           code: 'custom',
  //           expected: 'string',
  //           format: 'email',
  //           message: 'Invalid email address',
  //         });
  //       }
  //     }
  //   }),
  propertyOwnerPhone: z.coerce
    .string()
    .optional()
    .superRefine((data, ctx) => {
      if (data) {
        try {
          const phoneNumber = phoneUtil.parse(data);
          if (!phoneUtil.isPossibleNumber(phoneNumber)) {
            ctx.addIssue({
              code: 'invalid_format',
              format: 'phone',
              // validation: 'phone',
              // fatal: true,
              message: 'Invalid mobile number',
            });
          }
        } catch (error) {
          console.warn(error, "Couldn't validate phone number");
          ctx.addIssue({
            code: 'custom',
            // validation: '',
            // fatal: true,
            message: 'Invalid mobile number',
          });
        }
      }
    }),

  // 6.
  propertyRentalTypes: z.coerce
    .string()
    .min(1, { error: 'Property rental type is required' })
    .max(50, { error: 'Property rental type must be 1 to 50 characters.' }),

  // 7.
  propertyBedRooms: z.coerce.string().superRefine((data, ctx) => {
    if (data.length < 1) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 1,
        inclusive: true,
        message: 'Bedrooms must be at least 1',
      });
    }
  }),
  propertyBathRooms: z.coerce.string().superRefine((data, ctx) => {
    if (data.length < 1) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 1,
        inclusive: true,
        message: 'Bathrooms must be at least 1',
      });
    }
  }),
  numberOfGuests: z.coerce.string().superRefine((data, ctx) => {
    if (data.length < 1) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 1,
        inclusive: true,
        message: 'Guests must be at least 1',
      });
    }
  }),
  numberOfBeds: z.coerce.string().superRefine((data, ctx) => {
    if (data.length < 1) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 1,
        inclusive: true,
        message: 'Beds must be at least 1',
      });
    }
  }),
  hostLanguages: z
    .array(z.enum(hostLanguageEnum), {
      error: 'Please select a valid language.',
    })
    .min(1, 'At least one language must be selected.'),

  // 8.
  propertySurrounding: z.enum(propertySurroundingsEnum, {
    error: 'Please select a valid room surrounding',
  }),

  // 9.
  propertyEnvironment: z.enum(propertyEnvironmentsEnum, {
    error: 'Please select a valid room environment',
  }),

  // 10.
  propertyAccomodationType: z.enum(propertyAccomodationsEnum, {
    error: 'Please select an accomodation type.',
  }),

  // 11.
  propertyAmenities: z
    .array(
      z
        .string({ error: 'At least one amenity must be selected.' })
        .nonempty({ error: 'At least one amenity must be selected.' })
    )
    .refine((amenities) => amenities.length > 0, {
      path: ['propertyAmenities'],
      error: 'At least one amenity must be selected.',
    }),

  // 12.
  propertyRules: z
    .array(
      z.string().nonempty({ error: 'At least one rules must be selected.' })
    )
    .refine((rules) => rules.length > 0, {
      path: ['propertyRules'],
      error: 'At least one rules must be selected.',
    }),

  // 13.
  propertyAccessibilities: z
    .array(
      z.string().nonempty({
        error: 'At least one accessibilities must be selected.',
      })
    )
    .refine((accessibilities) => accessibilities.length > 0, {
      path: ['propertyAccessibilities'],
      error: 'At least one accessibilities must be selected.',
    }),

  // 14.
  propertyImages: z
    .array(z.url())
    .refine(
      (urls) => urls.some((url) => url !== ''),
      'At least one image is required'
    ),
  // .pipe(z.array(z.string().url())),
  // startDate: z.date({ required_error: 'Start Date is required' }),
  // endDate: z.date({ required_error: 'End Date is required' }),

  // 15.
  staysDateRange: z.object({
    from: z.date({ error: 'Start Date is required' }),
    to: z.date({ error: 'End Date is required' }),
  }),

  // 16.
  staysDurationInDays: z.string(),
});
// .superRefine((data) => {
//   if (data.startDate > data.endDate) {
//     return {
//       checkIn: 'Checkin date should be before checkout date',
//       checkOut: 'Checkout date should be after checkin date',
//     };
//   }
// });

export type AddPropertyValues = z.infer<typeof addPropertySchema>;
