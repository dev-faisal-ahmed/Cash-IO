import { ReactNode } from 'react';
import { Navbar } from './_components/navbar';
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
