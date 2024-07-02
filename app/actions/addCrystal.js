

// 'use server';
// import { auth } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';
// import { revalidatePath } from 'next/cache';

// async function addCrystal(formData) {
//   const resourceNumberValue = formData.get('resourceNumber');
//   const roughWeightValue = formData.get('roughWeight');
//   const roughColorValue = formData.get('roughColor');
//   const roughClarityValue = formData.get('roughClarity');
//   const machineColorValue = formData.get('machineColor');
//   const machineClarityValue = formData.get('machineClarity');
//   const fluorValue = formData.get('fluor');
//   const descriptionValue = formData.get('description');

//   if (!resourceNumberValue || resourceNumberValue === '') {
//     return { error: 'Resource Number is missing' };
//   }
//   if (!roughWeightValue || roughWeightValue === '' || roughWeightValue < 0) {
//     return { error: 'Rough Weight is missing or invalid' };
//   }

//   const resourceNumber = resourceNumberValue.toString();
//   const roughWeight = parseFloat(roughWeightValue.toString());
//   const roughColor = roughColorValue.toString();
//   const roughClarity = roughClarityValue.toString();
//   const machineColor = machineColorValue.toString();
//   const machineClarity = machineClarityValue.toString();
//   const fluor = fluorValue.toString();
//   const description = descriptionValue ? descriptionValue.toString() : '';

//   const { userId } = auth();

//   if (!userId) {
//     return { error: 'User not found' };
//   }

//   try {
//     const roughData = await db.roughcrystal.create({
//       data: {
//         resourceNumber,
//         roughWeight,
//         roughColor,
//         roughClarity,
//         machineColor,
//         machineClarity,
//         fluor,
//         roughDescription: description,
//         userId,
//       },
//     });

//     const options = [];
//     formData.forEach((value, key) => {
//       if (key.startsWith('options.') && value) {
//         const optionName = key.split('.')[1];
//         options.push({
//           estProgram: optionName,
//           estShape: '',
//           estColor: roughColor,
//           estClarity: roughClarity,
//           estFluor: '',
//           estPrice: 0,
//           estList: 0,
//           estDiscount: 0,
//           selected: false,
//           roughCrystalId: roughData.id,
//         });
//       }
//     });

//     if (options.length > 0) {
//       await db.option.createMany({
//         data: options,
//       });
//     }

//     revalidatePath('/');

//     return { data: roughData };
//   } catch (error) {
//     return { error: error };
//   }
// }

// export default addCrystal;
'use server'
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function addCrystal(formData) {
  const resourceNumberValue = formData.get('resourceNumber');
  const roughWeightValue = formData.get('roughWeight');
  const roughColorValue = formData.get('roughColor');
  const roughClarityValue = formData.get('roughClarity');
  const machineColorValue = formData.get('machineColor');
  const machineClarityValue = formData.get('machineClarity');
  const fluorValue = formData.get('fluor');
  const descriptionValue = formData.get('description');

  if (!resourceNumberValue || resourceNumberValue === '') {
    return { error: 'Resource Number is missing' };
  }
  if (!roughWeightValue || roughWeightValue === '' || roughWeightValue < 0) {
    return { error: 'Rough Weight is missing or invalid' };
  }

  const resourceNumber = resourceNumberValue.toString();
  const roughWeight = parseFloat(roughWeightValue.toString());
  const roughColor = roughColorValue.toString();
  const roughClarity = roughClarityValue.toString();
  const machineColor = machineColorValue.toString();
  const machineClarity = machineClarityValue.toString();
  const fluor = fluorValue.toString();
  const description = descriptionValue ? descriptionValue.toString() : '';

// const roughData ={
//           resourceNumber,
//           roughWeight,
//           roughColor,
//           roughClarity,
//           machineColor,
//           machineClarity,
//           fluor,
//           roughDescription: description}
// return {data:roughData}
         
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }  
       

  try {
    const roughData = await db.rough.create({
      data: {
        resourceNumber,
        roughWeight,
        roughColor,
        roughClarity,
        machineColor,
        machineClarity,
        fluor,
        roughDescription: description,
        userId,
        
        // userId: Replace with your user identification logic if needed
      },
    });


//     // Optionally revalidate your cache or perform other actions
    revalidatePath('/');

    return { data: roughData };
  } catch (error) {
    console.error({error: error})
    return { error: error };
  }
 }


export default addCrystal;
