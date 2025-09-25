import { faker } from '@faker-js/faker';

export function generateUsers(length = 10) {
  const users = [];

  for (let i = 0; i < length; i++) {
    const data = {
      fullName: faker.person.fullName(),
      username: faker.internet.domainWord(),
      email: faker.internet.email(),
      password: '',
      gender: faker.person.sex() as 'male' | 'female' | 'other',
      birthdate: faker.date
        .birthdate({ mode: 'age', min: 18, max: 65 })
        .toISOString(),
      bio: faker.person.bio(),
      avatarUrl: faker.image.avatar(),
      preferences: {
        fromLocation: {
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
        },
        toLocation: {
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
        },
      },
      locationLat: String(faker.location.latitude()),
      locationLng: String(faker.location.latitude()),
      lastActive: new Date().toISOString(),
      isOnline: faker.datatype.boolean(),
      isVerified: faker.datatype.boolean(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(data);
  }
  return users;
}
