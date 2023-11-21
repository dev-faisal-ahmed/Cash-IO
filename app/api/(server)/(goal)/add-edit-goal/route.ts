import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, goal } = await request.json();
    const { goalCollection } = await getCollections();
    const goalData = await goalCollection.findOne({ email });

    if (!goalData) {
      const insertStatus = await goalCollection.insertOne({
        email,
        goal,
      });
      if (!insertStatus.acknowledged)
        return NextResponse.json(errorResponse('Could not add the goal'));
      return NextResponse.json(successResponse('Goal added on successfully'));
    }

    const updateStatus = await goalCollection.updateOne(
      { email },
      { $set: { goal } },
    );

    if (!updateStatus.acknowledged)
      return NextResponse.json(errorResponse('Could not update goal'));

    return NextResponse.json(successResponse('Goal updated successfully'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
