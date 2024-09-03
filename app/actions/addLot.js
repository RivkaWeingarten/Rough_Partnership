"use server";
import { db } from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

export const addLot = async (lotData) => {

    const { userId } = auth();

    if (!userId) {
      return { error: "User not found" };
    }
  try {
  
    const newLot = await db.lot.create({
        data: {
            ...lotData,
            type: 'R',
            totalCts: parseFloat(lotData.totalCts),
            totalStones: parseInt(lotData.totalStones),
                      }
    });

    const { lotName, totalStones } = newLot;

    // Create rough crystals for each stone
    for (let i = 1; i <= totalStones; i++) {
        await db.rough.create({
            // data: {
            //   resourceNumber: `${lotName}-${i}`, // Format: lotName-stoneNumber
            // //   lotId: newLot.id, // Associate the roughCrystal with the newly created lot
            //   roughWeight: 0,
            //   roughColor: '',
            //   roughClarity: '',
            //   machineColor: '',
            //   plusMinusRColor: '',
            //   plusMinusRClarity: '',
            //   fluor: '',
            //   roughDescription: '',
            //   // Correct way to associate the rough record with the user
            //   user: {
            //     connect: { id: userId },
            //   },
            //   lot: {
            //     connect: { lotName },
            //   },
           
            // },

            data: {
                resourceNumber: `${lotName}-${i}`,
                roughWeight: 0,
                roughColor: '',
                plusMinusRColor:    '',
                plusMinusRClarity:  '',
                roughClarity: '',
                machineColor: '',
                machineClarity: '',
                fluor:  '',
                roughDescription: "",
                userId,
                lotNumber: lotName,
              },
          });
    }
    return newLot;
  } catch (error) {
    throw new Error(`Failed to add lot: ${error.message}`);
  }
};

export const checkLotExists = async (lotName) => {
  const lot = await db.lot.findUnique({
    where: { lotName },
  });
  return !!lot; 
}

export const updateLotRecord = async (lotName, lotData) => {
  try {
    const updatedLot = await db.lot.update({
      where: { lotName },
      data: lotData,
    });
    return updatedLot;
  } catch (error) {
    throw new Error(`Failed to update lot: ${error.message}`);
  }
}


export const deleteDiamondRecord = async (lotName) => {
  try {
    const deletedLot = await db.lot.delete({
      where: { lotName },
    });
    return deletedLot
  } catch (error) {
    throw new Error(`Failed to delete lot: ${error.message}`);
  }
};
