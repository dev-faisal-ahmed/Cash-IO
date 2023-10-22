import { ReactNode } from 'react';
import { TopBar } from './_components/top-bar';
import { SideBar } from './_components/side-bar';
import { MobileNavbar } from './_components/mobile-navbar';

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className='grid h-[100dvh] grid-rows-[auto_1fr_auto] gap-1 bg-gray-200 dark:bg-[#2f2f2f] sm:gap-6'>
      <TopBar />
      <section className='h-full gap-6 overflow-y-auto rounded-xl bg-transparent p-0 lg:container lg:flex lg:bg-white lg:dark:bg-[#1f1f1f]'>
        <SideBar />
        <section className='w-full overflow-y-auto px-5 py-6 lg:px-0'>
          {children}
        </section>
      </section>
      <div className='hidden lg:block' />
      <MobileNavbar />
    </main>
  );
}
