import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export async function GET(request: NextRequest) {
  try {
    const { transactionsCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const transactionInfo = await transactionsCollections
      .find({ email }, { projection: { email: 0 } })
      .sort({ date: -1 })
      .toArray();

    const transactions: { [key: string]: any[] } = {};
    const length = transactionInfo.length;

    for (let i = 0; i < length; i++) {
      const date = new Date(transactionInfo[i].date);
      const month = monthArr[date.getMonth()];
      const year = date.getFullYear();

      const monthYearStr = `${month}-${year}`;

      if (transactions[monthYearStr]) {
        transactions[monthYearStr].push(transactionInfo[i]);
      } else {
        transactions[monthYearStr] = [];
        transactions[monthYearStr].push(transactionInfo[i]);
      }
    }

    return NextResponse.json(transactions);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse());
  }
}
