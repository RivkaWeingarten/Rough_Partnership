"use server";
import { db } from "@/lib/db";

export const getLotDetails = async (lotName) => {
  try {
    const lot = await db.lot.findUnique({
      where: { lotName },
    });

    if (!lot) {
      throw new Error("Lot not found");
    }

    return lot;
  } catch (error) {
    throw new Error(`Failed to fetch lot details: ${error.message}`);
  }
};
