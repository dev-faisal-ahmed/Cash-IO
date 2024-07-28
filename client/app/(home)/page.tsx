import { Metadata } from 'next';
import { LogoutButton } from './_components/logout.button';
import { getUser } from '../_actions/get.user';

export const metadata: Metadata = {
  title: 'Cash-IO | Home',
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <main className='flex h-full flex-col items-center justify-center gap-5'>
      {JSON.stringify(user)}
      <LogoutButton />
    </main>
  );
}
