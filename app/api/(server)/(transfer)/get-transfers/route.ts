import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { transfersCollection } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const transfers = await transfersCollection
      .find({ email }, { projection: { email: 0 } })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(transfers || []);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
