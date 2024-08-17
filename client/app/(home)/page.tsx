import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cash-IO | Home',
};

export default async function HomePage() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-5'>
      Cash-IO
    </main>
  );
}
