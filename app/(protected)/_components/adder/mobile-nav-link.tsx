import Link from 'next/link';
import { ReactNode } from 'react';

type MobileNavLinkProps = {
  title: string;
  icon: ReactNode;
  url: string;
  currentUrl?: string;
};

export function MobileNavLink({
  title,
  url,
  icon,
  currentUrl,
}: MobileNavLinkProps) {
  return (
    <Link
      href={url}
      className={`flex flex-col items-center gap-3 px-3 py-1 ${
        currentUrl === url ? 'text-primary' : ''
      }`}
    >
      <span className='text-2xl'>{icon}</span>
      <span className='text-xs'>{title}</span>
    </Link>
  );
}
