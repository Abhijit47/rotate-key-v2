import {
  EventSchemas,
  GetFunctionInput,
  GetStepTools,
  Inngest,
  InngestFunction,
  type GetEvents,
} from 'inngest';

import {
  DeletedObjectJSON,
  EmailJSON,
  SessionJSON,
  UserJSON,
} from '@clerk/nextjs/server';

type UserSignup = {
  data: {
    email: string;
    name: string;
  };
};

type UserAccountSetupCompleted = {
  data: {
    user_id: string;
  };
};

type CreateUser = {
  data: UserJSON;
};

type UpdateUser = {
  data: UserJSON;
};

type DeletedUser = {
  data: DeletedObjectJSON;
};

type SessionUser = {
  data: SessionJSON;
};

type EmailData = {
  data: EmailJSON;
};

type Events = {
  'test/hello.world': { data: { email: string } };
  'user/new.signup': UserSignup;
  'user/account.setup.completed': UserAccountSetupCompleted;
  'clerk/user.created': CreateUser;
  'clerk/user.updated': UpdateUser;
  'clerk/user.deleted': DeletedUser;
  'clerk/session.created': SessionUser;
  'clerk/email.created': EmailData;
};

// By default, the returned events do not include internal events prefixed with inngest/, such as inngest/function.finished.
// type EventsType = GetEvents<typeof inngest>;

// To include these events in v3.13.1+ , pass a second true generic:
export type EventsType = GetEvents<typeof inngest, true>;

// GetFunctionInput
export type InputArg = GetFunctionInput<typeof inngest>;
export type InputArgWithTrigger = GetFunctionInput<
  typeof inngest,
  'user/new.signup'
>;

// GetStepTools
export type StepTools = GetStepTools<typeof inngest>;
export type StepToolsWithTrigger = GetStepTools<
  typeof inngest,
  'user/new.signup'
>;

// Inngest.Any / InngestFunction.Any
export const functionsToServe: InngestFunction.Any[] = [];

// Create a client to send and receive events
export const inngest = new Inngest({
  id: 'rotate-keys',
  schemas: new EventSchemas().fromRecord<Events>(),
});
