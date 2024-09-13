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
            cost: parseFloat(lotData.cost),

                      }
    });

    const { lotName, totalStones } = newLot;

    // Create rough crystals for each stone
    for (let i = 1; i <= totalStones; i++) {
        await db.rough.create({
       

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
