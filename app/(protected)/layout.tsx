import { ReactNode } from 'react';
import { TopBar } from './_components/top-bar';
import { SideBar } from './_components/side-bar';
import { MobileNavbar } from './_components/mobile-navbar';

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className='grid h-[100dvh] grid-rows-[auto_1fr_auto] gap-6 bg-gray-200 dark:bg-[#2f2f2f]'>
      <TopBar />
      <section className='container h-full w-[95%] overflow-y-auto rounded-xl bg-white px-0 dark:bg-[#1f1f1f] lg:flex xl:w-full'>
        <SideBar />
        <section className='w-full overflow-y-auto p-6'>{children}</section>
      </section>
      <div className='hidden lg:block' />
      <MobileNavbar />
    </main>
  );
}
