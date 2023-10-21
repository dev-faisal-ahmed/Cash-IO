import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();

    const email = request.nextUrl.searchParams.get('email');
    const walletInfo = await walletsCollection.find({ email }).toArray();
    const wallets = walletInfo || [];

    return NextResponse.json(wallets);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse(JSON.stringify(err)));
  }
}
