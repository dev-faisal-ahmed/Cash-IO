import { ReactNode } from 'react';
import { TopBar } from './_components/top-bar';
import { uiData } from '@/data/uiData';
import { SideBar } from './_components/side-bar';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className='h-screen bg-gray-200 dark:bg-[#2f2f2f]'>
      <TopBar />
      <section
        style={{ height: `calc(100vh - ${uiData.topBarHeight + 40}px)` }}
        className='container mt-5 flex w-[95%] overflow-y-auto rounded-xl bg-white px-0 dark:bg-[#1f1f1f] xl:w-full'
      >
        <SideBar />
        <section className='w-full overflow-y-auto p-6'>{children}</section>
      </section>
    </main>
  );
}
