import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    const { goalCollection } = await getCollections();
    const goalData = await goalCollection.findOne({ email });

    if (!goalData) return NextResponse.json({ ok: false, goal: null });
    return NextResponse.json({ ok: true, goal: goalData.goal });
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
