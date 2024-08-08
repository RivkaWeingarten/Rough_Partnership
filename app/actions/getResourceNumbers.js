
"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getResourceNumbers(lotId) {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: { company: true },
    });

    if (!user) {
      return { error: "User not found" };
    }
    const lot = await db.lot.findUnique({
      where: { lotName: lotId },
      include: {
        rough: {
          orderBy: { updatedAt: 'desc' },
          include: {
            diamonds: true,
            options: {
              orderBy: [
                { estPrice: 'desc' },
                { ABC: 'asc' },
              ],
            },
          },
        },
      },
    });

    if (!lot) {
      return { error: "Lot not found" };
    }

    // Filter options based on user company
    const resourceNumbers = lot.rough.map(roughItem => {
      let filteredOptions = roughItem.options;

      if (user.company === 'KW') {
        // Collect optionNumbers where options have ABC="A" and isPublic=true
        const validOptionNumbers = new Set();

        roughItem.options.forEach(option => {
          if (option.ABC === 'A' && option.isPublic) {
            validOptionNumbers.add(option.optionNumber);
          }
        });

        // Filter options to include only those that match validOptionNumbers
        filteredOptions = roughItem.options.filter(option =>
          validOptionNumbers.has(option.optionNumber)
        );
      }

      const totalDiamonds = roughItem.diamonds.length;
      const totalOptions = filteredOptions.length;

      return {
        ...roughItem,
        options: filteredOptions,
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
