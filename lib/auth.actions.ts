'use server';

export async function afterSSOSignUp(formData:FormData){
    return {
        status: 200,
    }
}