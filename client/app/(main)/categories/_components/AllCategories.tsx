'use client';

import { Loader } from '@/components/shared/Loading';
import { useGetCategoriesQuery } from '@/app/_redux/services/categoryApi';

export const AllCategories = () => {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery({});

  if (isLoading)
    return (
      <div className='flex min-h-[220px] items-center justify-center gap-3 rounded-md border border-input'>
        <Loader />
      </div>
    );

  if (!categoriesData?.data) return null;
  const { data: categories } = categoriesData;

  return <></>;
};
