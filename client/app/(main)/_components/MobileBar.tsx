'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { links } from '@/app/_data/links';
import { usePathname } from 'next/navigation';

export const MobileBar = () => {
  const pathName = usePathname();

  return (
    <div className='flex justify-between border-t px-6 py-3 md:hidden'>
      {links.map(({ icon, title, url }) => (
        <Link
          href={url}
          key={url}
          className={cn(
            'flex flex-col items-center gap-1',
            pathName === url && 'text-primary',
          )}
        >
          <span className='text-2xl'>{icon}</span>
          <span className='hidden text-[10px] min-[350px]:block'>{title}</span>
        </Link>
      ))}
    </div>
  );
};
