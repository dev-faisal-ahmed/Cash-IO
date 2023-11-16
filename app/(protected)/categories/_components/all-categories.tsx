'use client';

import { Loader } from '@/components/shared/loader';
import { CategoryBox } from './category-box';
import { useGetUser } from '@/hooks/use-get-user';
import { useGetCategoriesSummaryQuery } from '@/redux/services/api';

export function AllCategories() {
  const { user } = useGetUser();
  const { data, isLoading } = useGetCategoriesSummaryQuery(user?.email!);

  if (isLoading)
    return (
      <div className='grid min-h-[400px] grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='flex items-center justify-center rounded-md border'>
          <Loader />
        </div>
        <div className='flex items-center justify-center rounded-md border'>
          <Loader />
        </div>
      </div>
    );

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <CategoryBox type={'Expense'} categories={data?.expense.categories} />
      <CategoryBox type={'Revenue'} categories={data?.revenue.categories} />
    </div>
  );
}
