import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();
    const _id = request.nextUrl.searchParams.get('_id');

    const deleteStatus = await walletsCollection.deleteOne({
      _id: new ObjectId(_id as string),
    });

    if (!deleteStatus.acknowledged)
      return NextResponse.json(errorResponse('Could not delete wallet'));

    return NextResponse.json(
      successResponse('Wallet has been successfully deleted'),
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
