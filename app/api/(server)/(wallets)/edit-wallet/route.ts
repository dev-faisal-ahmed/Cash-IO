import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();

    const walletData = await request.json();

    const { _id, name, icon } = walletData;
    const updateStatus = await walletsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name, icon } },
    );

    if (!updateStatus.acknowledged)
      return NextResponse.json(errorResponse('Could not update the wallet'));

    return NextResponse.json(successResponse('Wallet updated successfully'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
