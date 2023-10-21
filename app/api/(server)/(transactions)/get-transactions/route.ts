import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { transactionsCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');
    const expense = await transactionsCollections
      .find({ email, type: 'expense' }, { projection: { email: 0 } })
      .sort({ date: -1 })
      .toArray();

    const revenue = await transactionsCollections
      .find({ email, type: 'revenue' }, { projection: { email: 0 } })
      .sort({ date: -1 })
      .toArray();

    const transactions = {
      revenue: revenue || [],
      expense: expense || [],
    };

    return NextResponse.json(transactions);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
