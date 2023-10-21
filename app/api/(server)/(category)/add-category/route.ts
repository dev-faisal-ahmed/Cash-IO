import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { categoriesCollections } = await getCollections();
    const { name, type, icon, email } = await request.json();

    const category = await categoriesCollections.findOne({ name, email });
    if (category)
      return NextResponse.json(errorResponse('Category was already created'));
    const insertStatus = await categoriesCollections.insertOne({
      name,
      type,
      icon,
      email,
      amount: 0,
    });

    if (!insertStatus.acknowledged)
      return NextResponse.json(errorResponse('Can not create the category'));
    return NextResponse.json(successResponse('Category successfully created'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
