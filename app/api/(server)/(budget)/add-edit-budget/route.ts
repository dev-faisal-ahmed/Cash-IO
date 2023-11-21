import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, successResponse } from '@/helpers/server-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, budget } = await request.json();
    const { budgetCollection } = await getCollections();

    const budgetData = await budgetCollection.findOne({ email });

    if (!budgetData) {
      const insertStatus = await budgetCollection.insertOne({ email, budget });
      if (insertStatus.acknowledged)
        return NextResponse.json(successResponse('Budget Added'));
      return NextResponse.json(errorResponse('Budget can not be added'));
    }

    const updateStatus = await budgetCollection.updateOne(
      { email },
      { $set: { budget } },
    );

    if (!updateStatus.acknowledged)
      return NextResponse.json(errorResponse('Can not update'));

    return NextResponse.json(successResponse('Budget updated'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
