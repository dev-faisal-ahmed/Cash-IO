import { Metadata } from 'next';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { AllCategories } from './_components/AllCategories';

export const metadata: Metadata = {
  title: 'Cash-IO | Categories',
};

export default function CategoriesPage() {
  return (
    <main className='grid grid-cols-4 gap-6'>
      <Link
        className='flex min-h-[220px] items-center justify-center gap-3 rounded-md border border-input'
        href={'/add-category'}
      >
        <FaPlus className='text-lg' />
        <span>Add Category</span>
      </Link>
      <AllCategories />
    </main>
  );
}
