"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

function findRapSize(carats) {
  const ranges = [
    { min: 0.18, max: 0.22, rapSize: 0.18 },
    { min: 0.23, max: 0.29, rapSize: 0.23 },
    { min: 0.3, max: 0.39, rapSize: 0.3 },
    { min: 0.4, max: 0.49, rapSize: 0.4 },
    { min: 0.5, max: 0.69, rapSize: 0.5 },
    { min: 0.7, max: 0.89, rapSize: 0.7 },
    { min: 0.9, max: 0.99, rapSize: 0.9 },
    { min: 1, max: 1.49, rapSize: 1 },
    { min: 1.5, max: 1.99, rapSize: 1.5 },
    { min: 2, max: 2.99, rapSize: 2 },
    { min: 3, max: 3.99, rapSize: 3 },
    { min: 4, max: 4.99, rapSize: 4 },
    { min: 5, max: 9.99, rapSize: 5 },
    { min: 10, max: 30, rapSize: 10 },
  ];

  for (const range of ranges) {
    if (carats >= range.min && carats <= range.max) {
      return range.rapSize;
    }
  }

  return null; 
}

async function getRap(shape, size, color, clarity) {
  try {
    const { userId } = auth();

    if (!userId) {
      return { error: "User not found" };
    }

    shape = shape.toUpperCase();
    let dbShape
    if (shape === "RB" || shape === "BR") {
      shape = "RB";
      dbShape = "RBRap";
    } else {
      shape = "PS";
      dbShape = "PSRap";
    }

    const shape_color_clarity_size = `${shape}-${color}-${clarity}-${findRapSize(size)}`;
    console.log(shape_color_clarity_size);
    const list = await db[dbShape].findUnique({
      where: { shape_color_clarity_size },
    });

    if (!list) {
      return { error: "Data not found" };
    }

    const caratprice = list.list;
    const listPrice = {
      caratprice,
      totalListPrice: caratprice * size,
    };

    return listPrice;
  } catch (error) {
    console.error("Error fetching data from RapNet:", error);
    throw error; // Handle or log the error as needed
  }
}

export default getRap;
