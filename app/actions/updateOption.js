"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const changeOptionData = async (optionId, updateData) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found" };
  }
  try {
    const updatedOption = await db.option.update({
      where: { id: optionId },
      data: updateData,
    });
    return updatedOption;
  } catch (error) {
    throw new Error(`Failed to update option: ${error.message}`);
  }
};

export default changeOptionData;
