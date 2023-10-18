import { errorResponse, onSuccessResponse } from '@/helpers/server-response';
import { walletsCollection } from '@/lib/mongo-db/collections';
import { NextResponse, type NextRequest } from 'next/server';

type WalletDataType = {
  email: string;
  name: string;
  initialBalance: number;
  fixedDeposit: boolean;
  icon: string;
};

export async function POST(request: NextRequest) {
  try {
    const walletData = await request.json();
    const { email, name, fixedDeposit, icon, initialBalance }: WalletDataType =
      walletData;
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

    return NextResponse.json(onSuccessResponse('Wallet Created Successfully'));
  } catch (err) {
    return NextResponse.json(errorResponse('Something Went Wrong'));
  }
}
