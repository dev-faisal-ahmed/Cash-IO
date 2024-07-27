import { auth } from '@/auth';
import { Metadata } from 'next';
import { LogoutButton } from './_components/logout.button';

export const metadata: Metadata = {
  title: 'Cash-IO | Home',
};

export default async function HomePage() {
  const session = await auth();
  return (
    <main className='flex h-full flex-col items-center justify-center gap-5'>
      {JSON.stringify(session)}
      <LogoutButton />
    </main>
  );
}
