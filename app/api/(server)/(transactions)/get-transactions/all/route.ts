import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { transactionsCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const transactions = await transactionsCollections
      .find({ email }, { projection: { email: 0 } })
      .toArray();

    return NextResponse.json(transactions || []);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
