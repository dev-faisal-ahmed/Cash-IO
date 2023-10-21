import { errorResponse, successResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      transactionsCollections,
      categoriesCollections,
      walletsCollection,
    } = await getCollections();

    const transactionsInfo = await request.json();
    const { amount, email, category, wallet, type } = transactionsInfo;

    const transactionInsertStatus =
      await transactionsCollections.insertOne(transactionsInfo);

    if (!transactionInsertStatus)
      return NextResponse.json(errorResponse('Could not insert transaction'));

    if (type === 'expense')
      await walletsCollection.updateOne(
        { email, name: wallet },
        { $inc: { expense: amount } },
      );
    else if (type === 'revenue')
      await walletsCollection.updateOne(
        { email, name: wallet },
        { $inc: { revenue: amount } },
      );

    await categoriesCollections.updateOne(
      { email, name: category },
      { $inc: { amount } },
    );

    return NextResponse.json(successResponse('Transaction successfully added'));
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
