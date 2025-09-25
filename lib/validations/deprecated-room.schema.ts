// import { roomOwnerships, roomSurroundins, roomTypes } from '@/constants';
// import { z } from 'zod';

// const roomTypesEnum = roomTypes.map((roomType) =>
//   roomType.name.toLowerCase()
// ) as [string, ...string[]];

// const roomSurroundingsEnum = roomSurroundins.map((surrounding) =>
//   surrounding.name.toLowerCase()
// ) as [string, ...string[]];

// const roomOwnershipsEnum = roomOwnerships.map((ownership) =>
//   ownership.title.toLowerCase()
// ) as [string, ...string[]];

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
//   }),
// });

// export const addPropertyStep2Schema = z.object({
//   streetAddress: z
//     .string()
//     .min(1, {
//       message: 'Street address must be 1 to 50 character.',
//     })
//     .max(50, {
//       message: 'Street address must be 1 to 50 character.',
//     }),
//   district: z
//     .string()
//     .min(1, {
//       message: 'District must be 1 to 50 character.',
//     })
//     .max(50, {
//       message: 'District must be 1 to 50 character.',
//     }),
//   state: z
//     .string()
//     .min(1, { message: 'State must be 1 to 50 character.' })
//     .max(50, { message: 'State must be 1 to 50 character.' }),
//   zipcode: z
//     .string()
//     .min(1, { message: 'Zipcode must be 1 to 50 character.' })
//     .max(50, { message: 'Zipcode must be 1 to 50 character.' }),
//   nation: z
//     .string()
//     .min(1, { message: 'Nation must be 1 to 50 character.' })
//     .max(50, { message: 'Nation must be 1 to 50 character.' }),
//   roomSurrounding: z.enum(roomSurroundingsEnum, {
//     required_error: 'Please select a room type.',
//     invalid_type_error: 'Please select a valid room surrounding',
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
// });

// export const addPropertyStep5Schema = z
//   .object({
//     images: z
//       .array(fileSchema)
//       .min(1, { message: 'At least one file must be uploaded' })
//       .max(6, { message: 'Maximum of 6 files allowed' }),
//     roomDescription: z
//       .string()
//       .min(10, {
//         message: 'Room description must be 10 character.',
//       })
//       .max(1000, {
//         message: 'Room description max limit 1000 character.',
//       }),
//     startDate: z.date({ required_error: 'Start Date is required' }), // timestamp with timezone
//     endDate: z.date({ required_error: 'End Date is required' }), // timestamp with timezone
//   })
//   .refine((data) => data.endDate >= data.startDate, {
//     message: 'End Date must be greater than or equal to Start Date',
//     path: ['endDate'],
//   });

// export const roomSchema = z
//   .object({
//     roomType: z.enum(roomTypesEnum, {
//       required_error: 'Please select a room type.',
//     }),
//     streetAddress: z
//       .string()
//       .min(1, {
//         message: 'Street address must be 1 to 50 character.',
//       })
//       .max(50, {
//         message: 'Street address must be 1 to 50 character.',
//       }),
//     district: z
//       .string()
//       .min(1, {
//         message: 'District must be 1 to 50 character.',
//       })
//       .max(50, {
//         message: 'District must be 1 to 50 character.',
//       }),
//     state: z
//       .string()
//       .min(1, { message: 'State must be 1 to 50 character.' })
//       .max(50, { message: 'State must be 1 to 50 character.' }),
//     zipcode: z
//       .string()
//       .min(1, { message: 'Zipcode must be 1 to 50 character.' })
//       .max(50, { message: 'Zipcode must be 1 to 50 character.' }),
//     nation: z
//       .string()
//       .min(1, { message: 'Nation must be 1 to 50 character.' })
//       .max(50, { message: 'Nation must be 1 to 50 character.' }),
//     roomSurrounding: z.enum(roomSurroundingsEnum, {
//       required_error: 'Please select a room type.',
//       invalid_type_error: 'Please select a valid room surrounding',
//     }),
//     roomArea: z.object({
//       value: z.coerce
//         .number({
//           message: 'Room area must be a number',
//         })
//         .positive({
//           message: 'Room area must be a positive number',
//         }),
//       unit: z
//         .string({
//           message: 'Specify a unit',
//         })
//         .nonempty(),
//       // unit: z.enum(roomAreaCalcUnit),
//     }),
//     amenities: z.array(z.string().nonempty()),
//     roomOwnership: z.string().nonempty(),
//     // image will be a piece of blob in array
//     images: z
//       .array(fileSchema)
//       .min(1, { message: 'At least one file must be uploaded' })
//       .max(6, { message: 'Maximum of 6 files allowed' }),
//     roomDescription: z
//       .string()
//       .min(10, {
//         message: 'Room description must be 10 character.',
//       })
//       .max(1000, {
//         message: 'Room description max limit 1000 character.',
//       }),
//     startDate: z.date({ required_error: 'Start Date is required' }), // timestamp with timezone
//     endDate: z.date({ required_error: 'End Date is required' }), // timestamp with timezone
//   })
//   .refine((data) => data.endDate >= data.startDate, {
//     message: 'End Date must be greater than or equal to Start Date',
//     path: ['endDate'],
//   });

// export type AddPropertyValues = z.infer<typeof roomSchema>;
