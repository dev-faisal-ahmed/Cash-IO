import { errorResponse, successResponse } from '@/helpers/server-response';
import { collections } from '@/lib/mongo-db/collections';
import { connectToDatabase } from '@/lib/mongo-db/mongo-client';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const walletsCollection = db.collection(collections.wallets);

    const walletData = await request.json();
    console.log(walletData);

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
