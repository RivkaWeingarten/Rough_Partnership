
"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getResourceNumbers(lotId) {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const lot = await db.lot.findUnique({
      where: { lotName: lotId },
      include: {
        rough: {
          orderBy: {updatedAt: 'desc'},
          include: {
            diamonds: true,
            options:{
            orderBy: {ABC: 'asc'},
            }
          },
        },
      },
    });

    if (!lot) {
      return { error: "Lot not found" };
    }

    // Aggregate data as needed
    const resourceNumbers = lot.rough.map(roughItem => {
      const totalDiamonds = roughItem.diamonds.length;
      const totalOptions = roughItem.options.length;

      return {
        ...roughItem,
        totalDiamonds,
        totalOptions,
      };
    });

    return { resourceNumbers };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Database error" };
  }
}

export default getResourceNumbers;
