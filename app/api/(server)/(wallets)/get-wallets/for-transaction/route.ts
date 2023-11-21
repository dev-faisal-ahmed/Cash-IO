import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();

    const email = request.nextUrl.searchParams.get('email');

    const walletInfo = await walletsCollection
      .find(
        { email },
        {
          projection: {
            name: 1,
            icon: 1,
            revenue: 1,
            expense: 1,
            _id: 0,
            saving: 1,
          },
        },
      )
      .toArray();

    const wallets: { [key: string]: any } = {};
    if (walletInfo)
      walletInfo?.forEach(
        (walletData) => (wallets[walletData.name] = walletData),
      );

    return NextResponse.json(wallets);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
