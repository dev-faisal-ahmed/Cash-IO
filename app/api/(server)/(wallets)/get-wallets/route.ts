import { dataResponse, errorResponse } from '@/helpers/server-response';
import { collections } from '@/lib/mongo-db/collections';
import { connectToDatabase } from '@/lib/mongo-db/mongo-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const walletsCollection = db.collection(collections.wallets);

    const email = request.nextUrl.searchParams.get('email');
    const walletInfo = await walletsCollection.find({ email }).toArray();

    return NextResponse.json(dataResponse(walletInfo || []));
  } catch (err) {
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
