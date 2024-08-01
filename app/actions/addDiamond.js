"use server";
import { db } from "@/lib/db";

export const addDiamondRecord = async (diamondData) => {
  try {
    const newDiamond = await db.diamond.create({
      data: diamondData,
    });
    return newDiamond;
  } catch (error) {
    throw new Error(`Failed to add diamond record: ${error.message}`);
  }
};

export const checkResourceNumberExists = async (resourceNumber) => {
  const diamond = await db.diamond.findUnique({
    where: { resourceNumber },
  });
  return !!diamond; 
}

export const updateDiamondRecord = async (resourceNumber, diamondData) => {
  try {
    const updatedDiamond = await db.diamond.update({
      where: { resourceNumber },
      data: diamondData,
    });
    return updatedDiamond;
  } catch (error) {
    throw new Error(`Failed to update diamond record: ${error.message}`);
  }
}


