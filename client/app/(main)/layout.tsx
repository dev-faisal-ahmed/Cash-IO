import { PropsWithChildren } from 'react';
import { Sidebar } from './_components/Sidebar';
import { TopBar } from './_components/TopBar';
import { getUserAction } from '../_actions/getUser.action';

export default async function MainLayout({ children }: PropsWithChildren) {
  const user = await getUserAction();

  return (
    <section className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar user={user!} />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar />
        <main className='customized_scrollbar h-full overflow-y-auto px-5'>
          {children}
        </main>
      </section>
    </section>
  );
}
