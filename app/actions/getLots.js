"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getLots() {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const lots = await db.lot.findMany({
      // where: { userId }, // Uncomment this if you want to filter by userId
      orderBy: {
        createdAt: "desc",
      },
      include: {
        rough: {
          include: {
            diamonds: true, 
          },
        },
      },
    });

    // Aggregate totals
    const aggregatedLots = lots.map(lot => {
      const totalTtlList = lot.rough.reduce((sum, rough) => 
        sum + rough.diamonds.reduce((diamondSum, diamond) => diamondSum + diamond.actTotalList, 0), 0);
      
      const totalPrice = lot.rough.reduce((sum, rough) => 
        sum + rough.diamonds.reduce((diamondSum, diamond) => diamondSum + diamond.estTotalPrice, 0), 0);

      return {
        ...lot,
        totalTtlList,
        totalPrice,
      };
    });

    return { lots: aggregatedLots };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Database error" };
  }
}

export default getLots;

