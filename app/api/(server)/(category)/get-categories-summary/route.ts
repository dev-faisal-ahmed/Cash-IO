import { errorResponse } from '@/helpers/server-response';
import { getCollections } from '@/lib/mongo-db/collections';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { categoriesCollections } = await getCollections();
    const email = request.nextUrl.searchParams.get('email');

    const categories = await categoriesCollections
      .aggregate([
        { $match: { email: email } },

        {
          $facet: {
            revenue: [
              { $match: { type: 'revenue' } },
              {
                $group: {
                  _id: '$type',
                  categories: { $push: '$$ROOT' },
                  totalAmount: { $sum: '$amount' },
                },
              },
            ],
            expense: [
              { $match: { type: 'expense' } },
              {
                $group: {
                  _id: '$type',
                  categories: { $push: '$$ROOT' },
                  totalAmount: { $sum: '$amount' },
                },
              },
            ],
          },
        },
      ])
      .toArray();

    const categoriesSummary = {
      revenue: categories[0].revenue[0],
      expense: categories[0].expense[0],
    };

    return NextResponse.json(categoriesSummary);
  } catch (err) {
    console.log(err);
    return NextResponse.json(errorResponse('Something went wrong'));
  }
}
