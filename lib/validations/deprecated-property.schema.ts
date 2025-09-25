// import {
//   accomodationType,
//   hostLanguages,
//   houseRules,
//   roomOwnerships,
//   roomSurroundins,
//   roomTypes,
// } from '@/constants';
// import libphonenumber from 'google-libphonenumber';
// import { z } from 'zod';

// const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// const roomTypesEnum = roomTypes.map((roomType) => roomType.value) as [
//   string,
//   ...string[]
// ];

// const roomSurroundingsEnum = roomSurroundins.map(
//   (surrounding) => surrounding.value
// ) as [string, ...string[]];

// const roomOwnershipsEnum = roomOwnerships.map((ownership) =>
//   ownership.title.toLowerCase()
// ) as [string, ...string[]];

// const houseRulesEnum = houseRules.map((rule) => rule.title) as [
//   string,
//   ...string[]
// ];

// // eslint-disable-next-line
// const roomAreaCalcUnit = [
//   'm²',
//   'ft²',
//   'yd²',
//   'in²',
//   'cm²',
//   'mm²',
//   'km²',
//   'mi²',
//   'ac',
//   'ha',
// ] as const;

// // const amenitiesEnums = roomAmeneties.map((amenity) => amenity.name) as [
// //   string,
// //   ...string[]
// // ];

// const accomodationTypeEnum = accomodationType.map((type) => type.title) as [
//   string,
//   ...string[]
// ];

// const hostLanguageEnum = hostLanguages.map((language) => language.language) as [
//   string,
//   ...string[]
// ];

// // // eslint-disable-next-line
// export const fileSchema = z
//   .instanceof(File)
//   .refine(
//     (file) => file.size <= 10 * 1024 * 1024, // 10MB
//     { message: 'File size must be less than 10MB' }
//   )
//   .refine(
//     (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
//     { message: 'Only JPEG, PNG, and WEBP images are allowed' }
//   );

// export const addPropertyStep1Schema = z.object({
//   roomType: z.enum(roomTypesEnum, {
//     required_error: 'Please select a room type.',
//     message: 'Please select a room type',
//   }),
// });

// export const addPropertyStep2Schema = z.object({
//   streetAddress: z
//     .string()
//     .min(1, {
//       message: 'Street address must be 1 to 50 characters.',
//     })
//     .max(50, {
//       message: 'Street address must be 1 to 50 characters.',
//     }),
//   district: z
//     .string()
//     .min(1, {
//       message: 'District must be 1 to 50 characters.',
//     })
//     .max(50, {
//       message: 'District must be 1 to 50 characters.',
//     }),
//   state: z
//     .string()
//     .min(1, { message: 'State must be 1 to 50 characters.' })
//     .max(50, { message: 'State must be 1 to 50 characters.' }),
//   zipcode: z
//     .string()
//     .min(1, { message: 'Zipcode must be 1 to 50 characters.' })
//     .max(50, { message: 'Zipcode must be 1 to 50 characters.' }),
//   nation: z
//     .string()
//     .min(1, { message: 'Nation must be 1 to 50 characters.' })
//     .max(50, { message: 'Nation must be 1 to 50 characters.' }),
//   roomSurrounding: z.enum(roomSurroundingsEnum, {
//     required_error: 'Please select a room type.',
//     invalid_type_error: 'Please select a valid room surrounding',
//     message: 'Please select a room surrounding',
//   }),
// });

// export const addPropertyStep3Schema = z.object({
//   bedRooms: z.coerce
//     .number()
//     .positive()
//     .min(1, { message: 'At least one bedroom is required' })
//     .max(10, { message: 'Maximum of 10 bedrooms allowed' }),
//   bathRooms: z.coerce
//     .number()
//     .positive()
//     .min(1, { message: 'At least one bathroom is required' })
//     .max(10, { message: 'Maximum of 10 bathrooms allowed' }),
//   numberOfGuests: z.coerce
//     .number()
//     .positive()
//     .min(1, { message: 'At least one guest is required' })
//     .max(10, { message: 'Maximum of 10 guests allowed' }),
//   numberOfBeds: z.coerce
//     .number()
//     .positive()
//     .min(1, { message: 'At least one bed is required' })
//     .max(10, { message: 'Maximum of 10 beds allowed' }),
// });

// export const addPropertyStep4Schema = z.object({
//   roomArea: z.object({
//     value: z.coerce
//       .number({
//         message: 'Room area must be a number',
//       })
//       .positive({
//         message: 'Room area must be a positive number',
//       }),
//     unit: z
//       .string({
//         message: 'Specify a unit',
//       })
//       .nonempty({
//         message: 'Specify a unit',
//       }),
//     // unit: z.enum(roomAreaCalcUnit),
//   }),
//   amenities: z
//     .array(
//       z.string().nonempty({ message: 'At least one amenity must be selected.' })
//     )
//     .refine((amenities) => amenities.length > 0, {
//       path: ['amenities'],
//     }),
//   roomOwnership: z.enum(roomOwnershipsEnum, {
//     required_error: 'Please select a room ownership.',
//     invalid_type_error: 'Please select a valid room ownership',
//     message: 'Please select a room ownership',
//   }),
//   ownerName: z.string().nonempty({ message: 'Owner name is required' }),
//   ownerEmail: z.string().email(),
//   ownerPhone: z
//     .string()
//     .nonempty({ message: 'Mobile number is required' })
//     .refine(
//       (number) => {
//         try {
//           const phoneNumber = phoneUtil.parse(number);
//           return phoneUtil.isValidNumber(phoneNumber);
//         } catch (error) {
//           console.warn(error, "Couldn't validate phone number");
//           return false;
//         }
//       },
//       { message: 'Invalid mobile number' }
//     ),
// });

// export const addPropertyStep5Schema = z.object({
//   accessibilities: z
//     .array(
//       z
//         .string()
//         .nonempty({ message: 'At least one accessibility must be selected.' })
//     )
//     .refine((accessibilities) => accessibilities.length > 0, {
//       path: ['accessibilities'],
//     }),
//   houseRules: z.enum(houseRulesEnum, {
//     required_error: 'Please select a house rule.',
//   }),
// });

// export const addPropertyStep6Schema = z.object({
//   accomodationType: z.enum(accomodationTypeEnum, {
//     required_error: 'Please select an accomodation type.',
//     invalid_type_error: 'Please select a valid accomodation type',
//     message: 'Please select an accomodation type',
//   }),
//   hostLanguages: z
//     .array(z.enum(hostLanguageEnum), {
//       message: 'Please select a valid language.',
//     })
//     .min(1, 'At least one language must be selected.'),
// });

// export const addPropertyStep7Schema = z.object({
//   // images: z
//   //   .array(fileSchema.optional())
//   //   // .min(1, { message: 'At least one file must be uploaded' })
//   //   .max(6, { message: 'Maximum of 6 files allowed' })
//   //   .refine((files) => files.filter(Boolean).length >= 1, {
//   //     // At least one file must be uploaded
//   //     message: 'At least one file must be uploaded',
//   //   }),
//   images: z
//     .array(z.string())
//     .refine(
//       (urls) => urls.some((url) => url !== ''),
//       'At least one image is required'
//     ),

//   roomDescription: z
//     .string()
//     .min(10, {
//       message: 'Room description must be 10 character.',
//     })
//     .max(1000, {
//       message: 'Room description max limit 1000 character.',
//     }),
//   startDate: z.date({ required_error: 'Start Date is required' }), // timestamp with timezone
//   endDate: z.date({ required_error: 'End Date is required' }), // timestamp with timezone
// });
// // .refine((data) => data.endDate >= data.startDate, {
// //   message: 'End Date must be greater than or equal to Start Date',
// //   path: ['endDate'],
// // });

// // Combine schemas into one
// // const combinedBaseSchema = addPropertyStep1Schema
// //   .merge(addPropertyStep2Schema)
// //   .merge(addPropertyStep3Schema)
// //   .merge(addPropertyStep4Schema)
// //   .merge(addPropertyStep5Schema);

// // Apply the refine method to the combined schema
// // export const combinedSchema = combinedBaseSchema.refine(
// //   (data) => data.endDate.getTime() >= data.startDate.getTime(),
// //   {
// //     message: 'End Date must be greater than or equal to Start Date',
// //     path: ['endDate'],
// //   }
// // );

// // export const combinedSchema = combinedBaseSchema.superRefine((data, ctx) => {
// //   if (data.endDate.getTime() < data.startDate.getTime()) {
// //     console.log('data', data);
// //     console.log('ctx', ctx);
// //     ctx.addIssue({
// //       code: z.ZodIssueCode.custom,
// //       message: 'End Date must be greater than or equal to Start Date',
// //       path: ['endDate'],
// //     });
// //   }
// // });

// export const combinedSchema = z
//   .object({
//     ...addPropertyStep1Schema.shape,
//     ...addPropertyStep2Schema.shape,
//     ...addPropertyStep3Schema.shape,
//     ...addPropertyStep4Schema.shape,
//     ...addPropertyStep5Schema.shape,
//     ...addPropertyStep6Schema.shape,
//     ...addPropertyStep7Schema.shape,
//   })
//   .superRefine((data, ctx) => {
//     // console.log('data', data);
//     // console.log('ctx', ctx);
//     if (data.endDate.getTime() < data.startDate.getTime()) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'End Date must be greater than or equal to Start Date',
//         path: ['endDate'],
//       });
//     }
//   });

// // Infer the combined type
// export type CombinedProperty = z.infer<typeof combinedSchema>;

// // Combine schemas using merge
// // export const combinedSchema = addPropertyStep1Schema
// //   .merge(addPropertyStep2Schema)
// //   .merge(addPropertyStep3Schema)
// //   .merge(addPropertyStep4Schema)
// //   .merge(addPropertyStep5Schema);

// // export const combinedSchema = z.object({
// //   ...addPropertyStep1Schema.shape,
// //   ...addPropertyStep2Schema.shape,
// //   ...addPropertyStep3Schema.shape,
// //   ...addPropertyStep4Schema.shape,
// //   ...addPropertyStep5Schema.shape,
// // });
