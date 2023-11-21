import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { transactionsCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const today = new Date();
    const month = today.getMonth();

    const transactionData = await transactionsCollections
      .aggregate([
        { $match: { email, type: 'expense' } },
        { $project: { month: { $month: '$date' }, amount: 1 } },
        { $match: { month: month + 1 } },
        { $group: { _id: '$month', amount: { $sum: '$amount' } } },
      ])
      .toArray();

    return NextResponse.json(transactionData[0]);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
