import Link from 'next/link';
import { ReactNode } from 'react';

type SideBarLinkProps = {
  title: string;
  url: string;
  currentUrl: string;
  icon: ReactNode;
};

export function SideBarLink({
  title,
  url,
  currentUrl,
  icon,
}: SideBarLinkProps) {
  return (
    <Link
      href={url}
      className={`flex items-center gap-5 rounded-md p-3 transition hover:bg-gray-100 hover:text-gray-700 dark:text-white dark:hover:bg-gray-700 ${
        currentUrl === url ? 'bg-indigo-700 text-white' : 'text-gray-700'
      } `}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
