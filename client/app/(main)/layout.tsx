import { PropsWithChildren } from 'react';
import { authGuardAction } from '../_actions';
import { Sidebar } from './_components/Sidebar';
import { TopBar } from './_components/TopBar';
import { MobileBar } from './_components/MobileBar';

export default async function MainLayout({ children }: PropsWithChildren) {
  const user = await authGuardAction();
  if (!user) return null;

  return (
    <section className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar user={user!} />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar user={user} />
        <main className='customized_scrollbar h-full overflow-y-auto px-5 pb-6'>
          {children}
        </main>
        <MobileBar />
      </section>
    </section>
  );
}
