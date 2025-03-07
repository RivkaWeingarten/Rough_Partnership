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
          orderBy: { updatedAt: "desc" },
          include: {
            diamonds: true,
            options: {
              orderBy: [
                { estPrice: "desc" },
                { ABC: "asc" },
              ],
            },
          },
        },
      },
    });

    if (!lot) {
      return { error: "Lot not found" };
    }

    const resourceNumbers = lot.rough.map((roughItem) => {
      let filteredOptions = roughItem.options;

      if (user.company === "KW") {
        // Collect optionNumbers where options have ABC="A" and isPublic=true
        const validOptionNumbers = new Set();

        roughItem.options.forEach((option) => {
          if (option.ABC === "A" && option.isPublic) {
            validOptionNumbers.add(option.optionNumber);
          }
        });

        // Filter options to include only those that match validOptionNumbers
        filteredOptions = roughItem.options.filter((option) =>
          validOptionNumbers.has(option.optionNumber)
        );
      }

      // Group options by optionNumber and calculate totalValue for each group
      const groupedOptions = Object.values(
        filteredOptions.reduce((acc, option) => {
          if (!acc[option.optionNumber]) {
            acc[option.optionNumber] = {
              optionNumber: option.optionNumber,
              options: [],
              totalValue: 0,
            };
          }
          acc[option.optionNumber].options.push(option);
          acc[option.optionNumber].totalValue += option.estPrice;
          return acc;
        }, {})
      );

      // Sort groupedOptions by totalValue in descending order
      const sortedOptions = groupedOptions
        .sort((a, b) => b.totalValue - a.totalValue)
        .flatMap((group) => group.options);

      const totalDiamonds = roughItem.diamonds.length;
      const totalOptions = sortedOptions.length;
      const diamondsFlat = lot.rough.flatMap((roughItem) => roughItem.diamonds);
      const totalTtlList = diamondsFlat.reduce(
        (sum, diamond) => sum + diamond.actTotalList,
        0
      );

      const totalPrice = diamondsFlat.reduce(
        (sum, diamond) => sum + diamond.estTotalPrice,
        0
      );

      

      return {
        ...roughItem,
        sortedOptions: sortedOptions,
        totalDiamonds,
        totalOptions,
        totalTtlList,
        totalPrice,
      };
    });
    // console.log("resourceNumbers:", resourceNumbers);
    return { resourceNumbers };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Database error" };
  }
}

export default getResourceNumbers;

