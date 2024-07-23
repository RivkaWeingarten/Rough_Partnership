'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getLotTtlList_Price() {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const lot = await db.rough.findMany({
      where: {lotId: lotId},
    });

    const TtlList = rough.reduce(
      (sum, rough) => sum + rough.diamond.TtlList,
      0
    );

    return { TtlList };
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getLotTtlList_Price;