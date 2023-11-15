'use client';

import { CategoryBox } from './category-box';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetCategoriesSummaryQuery } from '@/redux/services/api';

export function AllCategories() {
  const { user } = useGetUser();
  const { data } = useGetCategoriesSummaryQuery(user?.email!);

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <CategoryBox type={'Expense'} categories={data?.expense.categories} />
      <CategoryBox type={'Revenue'} categories={data?.revenue.categories} />
    </div>
  );
}
