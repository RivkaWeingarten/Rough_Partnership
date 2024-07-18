"use server";
import { db } from "@/lib/db";

const addDiamondRecord = async (diamondData) => {
  try {
    const newDiamond = await db.diamond.create({
      data: diamondData,
    });
    return newDiamond;
  } catch (error) {
    throw new Error(`Failed to add diamond record: ${error.message}`);
  }
};

export default addDiamondRecord;