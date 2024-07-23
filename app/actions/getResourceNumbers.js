"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getResourceNumbers() {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const resourceNumbers = await db.rough.findMany({
      // where: { userId }, // Uncomment this if you want to filter by userId
      orderBy: {
        createdAt: "desc",
      },
      include: {
        options: true,
        diamonds:true,
      },
    });

    return { resourceNumbers };
  } catch (error) {
    return { error: "Database error" };
  }
}

export default getResourceNumbers;
