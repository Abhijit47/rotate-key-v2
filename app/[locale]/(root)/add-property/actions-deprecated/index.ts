// 'use server';

// import { db } from '@/database/db';
// import { properties } from '@/database/schemas';
// import { currentUser } from '@clerk/nextjs/server';
// import csv from 'csv-parser';
// import fs from 'fs';
// import { UrlKeys } from 'nuqs';
// import { join } from 'path';

// import { propertyParser } from '../../swapping-places/_components/PropertyFilterAsideBar';
// import { addPropertySchema, AddPropertyValues } from '../schemas-deprecated';

// export async function createProperty(unsafeData: AddPropertyValues) {
//   // check if user is authenticated
//   const user = await currentUser();
//   if (!user) {
//     return {
//       success: false,
//       error: 'Not authenticated',
//       message: 'You must be logged in to create a property',
//     };
//   }

//   // check the rate limit here

//   const { success, data, error } = addPropertySchema.safeParse(unsafeData);

//   if (!success) {
//     // console.log({ error });
//     const err = error.errors.flatMap((err) => err.message).join(', ');
//     console.log({ err });
//     return {
//       success: false,
//       error: 'Invalid data',
//       message: 'Some fields are missing or invalid',
//     };
//   }

//   // console.log(JSON.stringify(data, null, 2));

//   const newPropertyObj = {
//     streetAddress: data.streetAddress.toLocaleLowerCase(),
//     countryOrNation: data.countryOrNation.name.toLocaleLowerCase(),
//     stateOrProvince: data.stateOrProvince.name.toLocaleLowerCase(),
//     cityOrTown: data.cityOrTown.name.toLocaleLowerCase(),
//     zipcode: data.zipcode,
//     propertyArea: data.propertyArea,
//     propertyAreaUnit: data.propertyAreaUnit,
//     propertyDescription: data.propertyDescription,
//     propertyType: data.propertyType,
//     propertyOwnership: data.propertyOwnership,
//     propertySwapping: data.propertySwapping,
//     propertyRentalType: data.propertyRentalTypes,
//     propertyBedRooms: data.propertyBedRooms,
//     propertyBathRooms: data.propertyBathRooms,
//     numberOfBeds: data.numberOfBeds,
//     numberOfGuests: data.numberOfGuests,
//     hostLanguages: data.hostLanguages,
//     propertySurrounding: data.propertySurrounding,
//     propertyEnvironment: data.propertyEnvironment,
//     propertyAccomodation: data.propertyAccomodationType,
//     propertyAmenities: data.propertyAmenities,
//     propertyRules: data.propertyRules,
//     propertyAccessibilities: data.propertyAccessibilities,
//     propertyImages: data.propertyImages,
//     startDate: data.staysDateRange.from,
//     endDate: data.staysDateRange.to,
//     staysDurationInDays: data.staysDurationInDays
//       ? Number(data.staysDurationInDays)
//       : 0,
//   };

//   await db.insert(properties).values({
//     ...newPropertyObj,
//     authorId: user.id,
//   });

//   return {
//     success: true,
//     error: null,
//     message: 'Property created successfully',
//   };
// }

// export async function getAllProperties() {
//   const result = await db.query.properties.findMany({
//     orderBy: (property, { desc }) => desc(property.createdAt),
//     limit: 12,
//   });

//   if (!result) {
//     return {
//       success: false,
//       error: 'Not found',
//       message: 'No properties found',
//       data: [],
//     };
//   }

//   return {
//     success: true,
//     error: null,
//     message: 'Properties fetched successfully',
//     data: result,
//   };
// }

// export async function getMyProperties() {
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: 'Not authenticated',
//       message: 'You must be logged in to view your properties',
//     };
//   }

//   const result = await db.query.properties.findMany({
//     where: (property, { eq }) => eq(property.authorId, user.id),
//     // columns: {
//     //   userId: true,
//     // }
//     limit: 10,
//     offset: 0,
//     orderBy: (property, { desc }) => desc(property.createdAt),

//     // with: {
//     //   userId: {
//     //     select: {
//     //       id: true,
//     //       firstName: true,
//     //       lastName: true,
//     //       email: true,
//     //       phoneNumber: true,
//     //       imageUrl: true,
//     //     },
//     //   },
//     // },
//     // populate the user object
//   });

//   return {
//     success: true,
//     data: result,
//   };
// }

// export async function userWithProperties() {
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: 'Not authenticated',
//       message: 'You must be logged in to view your properties',
//       data: null,
//     };
//   }

//   const result = await db.query.properties.findMany({
//     where: (property, { eq }) => eq(property.authorId, user.id),
//     with: {
//       author: {
//         columns: {
//           id: true,
//           clerkId: true,
//           hasImage: true,
//           fullName: true,
//           email: true,
//           firstName: true,
//           lastName: true,
//           avatar: true,
//           yourLocation: true,
//           yourDestination: true,
//           role: true,
//         },
//       },
//       review: true,
//     },
//     limit: 10,
//     offset: 0,
//     orderBy: (property, { desc }) => desc(property.createdAt),
//   });

//   if (!result) {
//     return {
//       success: false,
//       error: 'Not found',
//       message: 'No properties found for this user',
//       data: null,
//     };
//   }

//   return {
//     success: true,
//     error: null,
//     message: 'User properties fetched successfully',
//     data: result,
//   };
// }

// export async function getPropertyById(id: string) {
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: 'Not authenticated',
//       message: 'You must be logged in to view your properties',
//       data: null,
//     };
//   }

//   const propertyId = id;

//   if (!propertyId) {
//     return {
//       success: false,
//       error: 'Invalid data',
//       message: 'Property ID is required',
//       data: null,
//     };
//   }

//   const result = await db.query.properties.findFirst({
//     where: (property, { eq }) => eq(property.id, propertyId),
//     with: {
//       author: {
//         columns: {
//           id: true,
//           clerkId: true,
//           hasImage: true,
//           fullName: true,
//           email: true,
//           firstName: true,
//           lastName: true,
//           avatar: true,
//           yourLocation: true,
//           yourDestination: true,
//           role: true,
//         },
//       },
//       review: true,
//     },
//   });

//   if (!result) {
//     return {
//       success: false,
//       error: 'Not found',
//       message: 'No properties found for this user',
//       data: null,
//     };
//   }

//   return {
//     success: true,
//     error: null,
//     message: 'User properties fetched successfully',
//     data: result,
//   };
// }

// export type PropertyUrlType = UrlKeys<typeof propertyParser>;
// export async function getPropertyWithFilter(params: PropertyUrlType) {
//   const user = await currentUser();

//   if (!user) {
//     return {
//       success: false,
//       error: 'Not authenticated',
//       message: 'You must be logged in to view your properties',
//       data: null,
//     };
//   }

//   const { type } = params;

//   try {
//     if (type) {
//       const result = await db.query.properties.findMany({
//         where: (property, { eq }) => eq(property.propertyType, type),
//       });
//       return {
//         success: true,
//         error: null,
//         message: 'User properties fetched successfully',
//         data: result,
//       };
//     } else {
//       const result = await db.query.properties.findMany({
//         orderBy: (property, { desc }) => desc(property.createdAt),
//         limit: 12,
//       });
//       return {
//         success: true,
//         error: null,
//         message: 'Properties fetched successfully',
//         data: result,
//       };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       success: false,
//       error: 'Not found',
//       message: 'No properties found for this user',
//       data: [],
//     };
//   }
// }

// export type RowType = {
//   ISO: string;
//   Country: string;
//   Sovereign: string;
//   'Zip Format': string;
//   'Zip Name': string;
//   Regex: string;
// };

// const patterns: {
//   [key: string]: RegExp;
// } = {};

// // Step 1: Read the CSV file and extract regex patterns
// export async function readCsv() {
//   const root = process.cwd();
//   const filePath = join(
//     root,
//     'docs',
//     'International Zip Code Formats - GeoPostcodes.csv'
//   );

//   // const newFileName = 'CountryCode.ts';
//   // const newFilePath = join(root, 'docs');

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (row: RowType) => {
//       const countryCode = row.ISO;

//       // create one file typescript string union type
//       // export type CountryCode = "US" | "UK"
//       // fs.createWriteStream(newFilePath + '/' + newFileName, {
//       //   flags: 'a',
//       // }).write(`export type countryCode = "${countryCode}"|`);

//       const regexPattern = new RegExp(row.Regex);
//       patterns[countryCode] = regexPattern;
//     })
//     .on('end', () => {
//       console.log('CSV file successfully processed');
//       // console.log(patterns);
//     });
// }
