import * as Card from '@/components/ui/card';
import { allIconsData } from '@/data/all-icons-data';
import { ExpenseCategoryType, RevenueCategoryType } from '@/lib/data-types';
import { twMerge } from 'tailwind-merge';

type CategoryBoxProps = {
  type: string;
  categories: RevenueCategoryType[] | ExpenseCategoryType[] | undefined;
  className?: string;
};

export function CategoryBox({ type, categories, className }: CategoryBoxProps) {
  return (
    <Card.Card
      className={twMerge(
        'h-fit overflow-y-auto border border-gray-400 bg-transparent p-5 text-gray-800 dark:border-white dark:text-white md:mt-0',
        className,
      )}
    >
      <h2 className='text-2xl font-bold tracking-tight'>
        Category &nbsp; : &nbsp; {type}
      </h2>
      {categories && categories.length > 0 ? (
        <Card.CardContent className='mt-10 space-y-5 px-0'>
          {categories.map((category, index) => (
            <div key={index} className='space-y-8'>
              <div className='flex items-center gap-2'>
                <p className='rounded-md bg-indigo-700 p-3 text-3xl text-white shadow'>
                  {allIconsData[category.icon]}
                </p>
                <div className='ml-4 space-y-1 pr-8'>
                  <p className='font-semibold leading-none'>{category.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    {category.type}
                  </p>
                </div>
                <div className='ml-auto font-semibold'>
                  + &#2547;{category.amount ? category.amount : 0}
                </div>
              </div>
            </div>
          ))}
        </Card.CardContent>
      ) : (
        <div className='mt-2 text-muted-foreground'>Nothing to show</div>
      )}
    </Card.Card>
  );
}
