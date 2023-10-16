'use client';

import { navigationLinksData } from '@/data/navigation-links-data';
import { uiData } from '@/data/uiData';
import { usePathname } from 'next/navigation';
import { SideBarLink } from './side-bar-link';
import { UserInfo } from './user-info';

export function SideBar() {
  const pathName = usePathname();
  return (
    <section
      className='flex h-full flex-col justify-between  p-5 shadow-md shadow-gray-300 dark:shadow-gray-500'
      style={{ width: uiData.sidebarWidth }}
    >
      <div className='space-y-2'>
        {navigationLinksData.map(({ title, icon, url }, index) => (
          <SideBarLink
            key={index}
            title={title}
            icon={icon}
            url={url}
            currentUrl={pathName}
          />
        ))}
      </div>

      <UserInfo />
    </section>
  );
}
