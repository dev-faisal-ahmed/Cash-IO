import { Metadata } from 'next';
import { getUserAction } from '@/app/_actions/getUser.action';

export const metadata: Metadata = {
  title: 'Cash-IO | Home',
};

export default async function HomePage() {
  const user = await getUserAction();
  return (
    <main className='flex h-full flex-col items-center justify-center gap-5'>
      Cash-IO
      <h2>User : User</h2>
    </main>
  );
}
