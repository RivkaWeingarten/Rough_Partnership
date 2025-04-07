"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const updateLot = async (lotName, lotData) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const existingLot = await db.lot.findUnique({
      where: { lotName },
    });

    if (!existingLot) {
      throw new Error("Lot not found");
    }

    const updatedLot = await db.lot.update({
      where: { lotName },
      data: {
        ...lotData,
        totalCts: parseFloat(lotData.totalCts),
        totalStones: parseInt(lotData.totalStones),
        cost: parseFloat(lotData.cost),
      },
    });

    return updatedLot;
  } catch (error) {
    throw new Error(`Failed to edit lot: ${error.message}`);
  }
};
