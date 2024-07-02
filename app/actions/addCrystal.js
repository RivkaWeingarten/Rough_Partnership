'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';



async function addCrystal(formData) {
  const resourceNumberValue = formData.get('resourceNumber');
  const roughWeightValue = formData.get('roughWeight');

  // Check for input values
  if (!resourceNumberValue || resourceNumberValue === '' ) {
    return { error: 'Resource Number is missing' };
  }if (!roughWeightValue || roughWeightValue==='' || roughWeightValue < 0 ){
    return {error: 'Rough Weight is missing or invalid'}
  }

  const resourceNumber  = resourceNumberValue.toString(); // Ensure resource number is a string
  const roughWeight =  parseFloat(roughWeightValue.toString()); // Parse rough weight as number

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const roughData = await db.roughcrystal.create({
      data: {
        resourceNumber,
        roughWeight,
        userId,
      },
    }); // rw to do add million fields

    revalidatePath('/');

    return { data: roughData };
  } catch (error) {
    return { error: 'Transaction not added' };
  }
}

export default addCrystal;