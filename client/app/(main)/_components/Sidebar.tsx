'use client';

import Link from 'next/link';
import { links } from '@/app/_data/links';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { TLoggedUser } from '@/app/_utils/types';

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
      <Logo className='justify-center' />
      <div className='mt-8 flex flex-col gap-3'>
        {links.map(({ url, title, icon }) => (
          <Link
            key={url}
            href={url}
            className={cn(
              'flex items-center gap-3 border-r-[3px] px-4 py-1 text-base hover:bg-primary hover:text-white',
              pathName === url && 'border-primary font-semibold text-primary',
            )}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>

      <div className='mt-auto flex items-end gap-4 border-t-2 px-6 pt-3'>
        <ProfileIcon name={user.name} />
        <div>
          <h3 className='line-clamp-1 font-bold'>{user.name}</h3>
          <p className='line-clamp-1 text-xs'>{user.email}</p>
        </div>
      </div>
    </aside>
  );
};
