// in-built node modules
import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline/promises';

import { faker } from '@faker-js/faker';

// load environment variables from .env file
import { loadEnvConfig } from '@next/env';

// import { neon } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import { seed } from 'drizzle-seed';

import * as schemas from './schemas';
// import { AbstractGenerator } from 'drizzle-orm/pg-core';

loadEnvConfig(process.cwd(), true);

export const images = [
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  // 'https://unsplash.com/photos/brown-and-white-concrete-house-near-green-grass-field-during-daytime-aren8nutd1Q',
  // 'https://unsplash.com/photos/brown-and-white-concrete-house-uOYak90r4L0',
  // 'https://unsplash.com/photos/white-concrete-house-near-green-tree-during-daytime-4ojhpgKpS68',
  // 'https://unsplash.com/photos/white-and-grey-concrete-building-near-swimming-pool-under-clear-sky-during-daytime-2d4lAQAlbDA',
  // 'https://unsplash.com/photos/living-room-L7EwHkq1B2s',
  // 'https://unsplash.com/photos/concrete-house-near-a-body-of-water-and-forest-XJnP4L958ds',
  // 'https://unsplash.com/photos/white-concrete-building-g39p1kDjvSY',
  // 'https://unsplash.com/photos/white-and-red-house-Hh18POSx5qk',
  // 'https://unsplash.com/photos/brown-and-white-concrete-house-z11gbBo13ro',
  // 'https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-during-daytime-ITzfgP77DTg',
  // 'https://unsplash.com/photos/brown-and-red-house-near-trees-bjej8BY1JYQ',
  // 'https://unsplash.com/photos/white-and-brown-concrete-house-near-green-trees-during-daytime-wwqZ8CM21gg',
  // 'https://unsplash.com/photos/white-and-brown-concrete-building-b_79nOqf95I',
  // 'https://unsplash.com/photos/brown-wooden-house-with-green-grass-field-Bkp3gLygyeA',
  // 'https://unsplash.com/photos/white-and-brown-concrete-house--dcznEJPmsk',
];
export const propertyTypes = [
  'Apartment',
  'House',
  'Condo',
  'Townhouse',
  'Villa',
  'Cottage',
  'Bungalow',
  'Duplex',
  'Loft',
  'Studio',
  'Penthouse',
  'Farmhouse',
  'Ranch',
  'Cabin',
  'Chalet',
  'Mansion',
  'Castle',
  'Dormitory',
  'Mobile Home',
  'Tiny House',
  'Treehouse',
  'Yurt',
  'Houseboat',
  'Igloo',
  'Hut',
  'Palace',
  'Chateau',
  'Manor',
  'Estate',
  'Retreat',
  'Resort',
  'Lodge',
  'Inn',
];

const rl = readline.createInterface({ input, output });
const ac = new AbortController();
const signal = ac.signal;

async function main() {
  // const sql = neon(process.env.DATABASE_URL!);
  // const db = drizzle({ client: sql, schema: schemas });

  // const USERID = 'user_3216aDcSgEj8Ew4nJtvyEu0f05r';

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle({
    client: pool,
    schema: schemas,
  });

  const data: schemas.InsertProperty[] = [];

  const userId = await rl.question(
    'Please enter a user id for seeding the database: ',
    { signal }
  );
  console.log(`Your provided user id: ${userId}`);
  if (!userId.includes('user_')) {
    console.error('Invalid user id format. It should start with "user_".');
    process.exit(1);
  }

  const amountOfSeeding = await rl.question(
    'Please enter the amount of properties to be seeded (default is 5): ',
    { signal }
  );
  console.log(`Amount of properties to be seeded: ${amountOfSeeding}`);
  const seedingCount = amountOfSeeding ? parseInt(amountOfSeeding) : 5;
  if (isNaN(seedingCount) || seedingCount <= 0) {
    console.error(
      'Invalid amount for seeding. Please enter a positive number.'
    );
    process.exit(1);
  }

  await Array.fromAsync({ length: seedingCount }, async () => {
    // const randomImages = Array.from({ length: 3 }, () => {
    //   const randomIndex = Math.floor(Math.random() * images.length);
    //   return images[randomIndex];
    // }); // get 3 random images
    // const randomType =
    //   propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const property = {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(propertyTypes),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipcode: faker.location.zipCode(),
      images: faker.helpers.uniqueArray(images, 3),
      description: faker.lorem.paragraphs(10),
      area: faker.helpers.rangeToNumber({ min: 200, max: 10000 }),
      bedrooms: faker.helpers.rangeToNumber({ min: 1, max: 6 }),
      bathrooms: faker.helpers.rangeToNumber({ min: 1, max: 6 }),
      ownerName: faker.person.fullName(),
      ownerEmail: faker.internet.email(),
      isAvailable: faker.datatype.boolean(),
      authorId: userId,
      createdAt: faker.date.past().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // console.log('Generated properties:', property);

    data.push(property);
  });

  await db
    .insert(schemas.properties)
    .values(data)
    .returning()
    .then((res) => {
      console.log(`Inserted ${res.length} properties into the database.`);
    });

  // await seed(
  //   db,
  //   { properties: schemas.properties },
  //   { count: amountOfSeeding ? parseInt(amountOfSeeding) : 5 }
  // ).refine((fn) => {
  //   console.log('Seeding started...');
  //   return {
  //     properties: {
  //       columns: {
  //         // id: fn.uuid(),
  //         type: fn.valuesFromArray({
  //           values: propertyTypes,
  //           // arraySize: 1,
  //           isUnique: true,
  //         }),
  //         address: fn.streetAddress(),
  //         city: fn.city(),
  //         state: fn.state(),
  //         country: fn.country(),
  //         zipcode: fn.postcode(),
  //         images: fn.valuesFromArray({ values: images, arraySize: 3 }),
  //         description: fn.loremIpsum({ sentencesCount: 10, arraySize: 5 }),
  //         area: fn.int({ minValue: 200, maxValue: 10000 }),
  //         bedrooms: fn.int({ minValue: 1, maxValue: 10 }),
  //         bathrooms: fn.int({ minValue: 1, maxValue: 10 }),
  //         ownerName: fn.fullName({ isUnique: true }),
  //         ownerEmail: fn.email(),
  //         isAvailable: fn.boolean(),

  //         authorId: fn.default({ defaultValue: userId }),
  //       },
  //     },
  //   };
  // });

  console.log('Seeding completed!');
  rl.close();
  ac.abort();
  process.exit(0);
}

main();
