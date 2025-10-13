'use server';

export async function createReview(formData: FormData) {
  console.log('Form Data received:', formData.get('title'));
  console.log('Form Data received:', formData.get('rating'));
  console.log('Form Data received:', formData.get('description'));
  console.log('Form Data received:', formData.get('propertyId'));
  return {
    success: true,
  };
}
