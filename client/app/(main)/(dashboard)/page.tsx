import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cash-IO | Home',
};

export default async function HomePage() {
  return (
    <main className=''>
      Cash-IO
      <h2>User : User</h2>
    </main>
  );
}
