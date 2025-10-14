// NOTE: https://www.inngest.com/docs/typescript

// import { type GetStepTools, type InngestFunction } from 'inngest';
// import { inngest } from './client';

/*
GetStepTools
v3.3.0+
Get the step object passed to an Inngest function given an Inngest client and, optionally, an event trigger.

Is a small shim over the top of GetFunctionInput<...>["step"].
*/

// export type StepTools = GetStepTools<typeof inngest>;
// export type StepToolsWithTrigger = GetStepTools<
//   typeof inngest,
//   'user/new.signup'
// >;

/*
Inngest.Any / InngestFunction.Any
v3.10.0+
Some exported classes have an Any type within their namespace that represents any instance of that class without inference or generics.

This is useful for typing lists of functions or factories that create Inngest primitives.
*/

// export const functionsToServe: InngestFunction.Any[] = [];
