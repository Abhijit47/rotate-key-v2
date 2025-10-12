export {};

// Create a type for the roles
export type Roles = 'admin' | 'moderator' | 'guest';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      isOnboarded?: boolean;
      plan?: Plans;
    };
  }

  interface UserPublicMetadata {
    metadata: {
      role?: Roles;
      isOnboarded?: boolean;
      plan?: Plans;
    };
  }
}
