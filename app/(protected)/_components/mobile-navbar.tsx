'use client';
import { navigationLinksData } from '@/data/navigation-links-data';
import { MobileNavLink } from './adder/mobile-nav-link';
import { usePathname } from 'next/navigation';

export function MobileNavbar() {
  const pathName = usePathname();
  return (
    <section className='grid w-full grid-cols-3 border-t bg-white py-2 dark:border-gray-700 dark:bg-[#1f1f1f] lg:hidden'>
      {navigationLinksData.map((navData, index) => (
        <MobileNavLink
          key={index}
          title={navData.title}
          url={navData.url}
          icon={navData.icon}
          currentUrl={pathName}
        />
      ))}
    </section>
  );
}
