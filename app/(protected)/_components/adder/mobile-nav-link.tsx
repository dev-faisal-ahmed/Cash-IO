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
      className={`flex flex-col items-center gap-2 px-3 py-1 text-sm ${
        currentUrl === url ? 'text-primary' : ''
      }`}
    >
      {icon}
      {title}
    </Link>
  );
}
