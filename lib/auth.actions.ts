'use server';

export async function signUpWithCredentials(formData: FormData) {
  console.log(formData);
  return {
    status: 200,
  };
}
export async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log({ email, password });
  return {
    status: 200,
  };
}

export async function afterSSOSignUp(formData: FormData) {
  console.log(formData);
  return {
    status: 200,
  };
}
