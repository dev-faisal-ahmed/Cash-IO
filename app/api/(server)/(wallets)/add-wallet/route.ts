import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { walletsCollection } = await getCollections();

    const { email, name, fixedDeposit, icon, initialBalance } =
      await request.json();

    const wallet = await walletsCollection.findOne({ email, name });
    if (wallet)
      return NextResponse.json(
        errorResponse('Already has a wallet with same name'),
      );

    const insertStatus = await walletsCollection.insertOne({
      email,
      name,
      fixedDeposit,
      icon,
      revenue: initialBalance,
      expense: 0,
    });

    if (!insertStatus.acknowledged)
      return NextResponse.json(
        errorResponse('Can not create a wallet right now. Try Again'),
      );

    return NextResponse.json(successResponse('Wallet Created Successfully'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something Went Wrong'));
  }
}
