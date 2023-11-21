import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const savingsData = await walletsCollection
      .aggregate([
        { $match: { email, saving: true } },
        {
          $group: {
            _id: '$saving',
            revenue: { $sum: '$revenue' },
            expense: { $sum: 'expense' },
          },
        },
      ])
      .toArray();

    return NextResponse.json(savingsData[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
