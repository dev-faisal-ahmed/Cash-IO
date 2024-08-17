'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { links } from '@/app/_data/links';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { TLoggedUser } from '@/app/_utils/types';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { isActive } from '@/app/_utils/helpers/activeLink.helper';

type TProps = {
  className?: string;
  user: TLoggedUser;
};

export const Sidebar = ({ className, user }: TProps) => {
  const pathName = usePathname();

  return (
    <aside
      className={cn(
        'hidden min-h-screen min-w-[240px] flex-col border-r border-neutral-500 bg-card py-6 md:flex',
        className,
      )}
    >
      <Logo className='mx-4 pt-2' />
      <div className='mt-8 flex flex-col gap-3'>
        {links.map(({ url, title, icon }) => (
          <Link
            key={url}
            href={url}
            className={cn(
              'flex items-center gap-3 border-r-[3px] px-4 py-1 text-base duration-300 hover:bg-primary hover:text-white',
              isActive(url, pathName) &&
                'border-primary font-semibold text-primary',
            )}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>

      <div className='mt-auto flex items-end gap-4 border-t-2 px-6 pt-6'>
        <ProfileIcon name={user.name} />
        <div>
          <h3 className='line-clamp-1 font-bold'>{user.name}</h3>
          <p className='line-clamp-1 text-xs'>{user.email}</p>
        </div>
      </div>
    </aside>
  );
};
