import { inngest } from './client';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    return { message: `Hello ${event.data.email}!` };
  }
);

export const sendWelcomeEmail = inngest.createFunction(
  { id: 'send-welcome-email' },
  { event: 'user/new.signup' },
  async ({ event }) => {
    // "event" is fully typed to provide typesafety within this function
    // return await email.send('welcome', event.data.email);
    console.log(`Sending welcome email to ${event.data.email}`);
    return { success: true };
  }
);

export const syncUser = inngest.createFunction(
  { id: 'sync-user-from-clerk' }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: 'clerk/user.created' }, // ← This is the function's triggering event
  async ({ event }) => {
    const user = event.data; // The event payload's data will be the Clerk User json object
    console.log('New Clerk user created:', user);
    // const { id, first_name, last_name } = user;
    // const email = user.email_addresses.find(
    //   (e) => e.id === user.primary_email_address_id
    // )?.email_address;

    // // await database.users.insert({ id, email, first_name, last_name });
    // console.log('Syncing user to database:', {
    //   id,
    //   email,
    //   first_name,
    //   last_name,
    // });
    return { success: true };
  }
);

export const deleteUser = inngest.createFunction(
  { id: 'delete-user-from-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const deletedUser = event.data; // The event payload's data will be the Clerk DeletedObject json
    console.log('Clerk user deleted:', deletedUser);
    // const userId = deletedUser.id;
    // await database.users.delete({ id: userId });
    // console.log('Deleted user from database:', { id: userId });
    return { success: true };
  }
);

export const updateUser = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const user = event.data; // The event payload's data will be the Clerk User json object
    console.log('Clerk user updated:', user);
    // const { id, first_name, last_name } = user;
    // const email = user.email_addresses.find(
    //   (e) => e.id === user.primary_email_address_id
    // )?.email_address;
    // await database.users.update({ id, email, first_name, last_name });
    // console.log('Updated user in database:', {
    //   id,
    //   email,
    //   first_name,
    //   last_name,
    // });
    return { success: true };
  }
);

export const createSession = inngest.createFunction(
  { id: 'create-session-from-clerk' },
  { event: 'clerk/session.created' },
  async ({ event }) => {
    const session = event.data; // The event payload's data will be the Clerk Session json object
    console.log('Clerk session created:', session);
    return { success: true };
  }
);

export const createEmailInClerk = inngest.createFunction(
  { id: 'create-email-from-clerk' },
  { event: 'clerk/email.created' },
  async ({ event }) => {
    const email = event.data; // The event payload's data will be the Clerk Email json object
    console.log('Clerk email created:', email);
    return { success: true };
  }
);
