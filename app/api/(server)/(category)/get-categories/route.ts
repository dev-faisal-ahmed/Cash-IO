import { dataResponse, errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { categoriesCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const revenue = await categoriesCollections
      .find({ email, type: 'revenue' })
      .toArray();
    const expense = await categoriesCollections
      .find({ email, type: 'expense' })
      .toArray();

    const categories = { revenue: revenue || [], expense: expense || [] };
    return NextResponse.json(dataResponse(categories));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
