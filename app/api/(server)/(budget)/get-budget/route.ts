import { NextRequest, NextResponse } from 'next/server';
import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    const { budgetCollection } = await getCollections();
    const budgetData = await budgetCollection.findOne({ email });

    if (!budgetData) return NextResponse.json({ ok: false, budget: null });

    return NextResponse.json({ ok: true, budget: budgetData.budget });
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
