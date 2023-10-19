import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { walletsCollection, transfersCollection } = await getCollections();

    const transferData = await request.json();
    const { email, from, to, amount } = transferData;

    console.log(email, from, to, amount);

    await walletsCollection.updateOne(
      { email, name: from },
      { $inc: { revenue: -amount } },
    );

    await walletsCollection.updateOne(
      { email, name: to },
      { $inc: { revenue: amount } },
    );

    const insertStatus = await transfersCollection.insertOne({
      email,
      to,
      from,
      amount,
      date: new Date(),
    });

    if (!insertStatus.acknowledged)
      return NextResponse.json(errorResponse('Something went wrong'));

    return NextResponse.json(
      successResponse('Credit transferred successfully'),
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
