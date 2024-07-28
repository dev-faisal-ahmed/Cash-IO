import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cash-IO',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={cn(font.className)}>
        {children}

        <Toaster richColors duration={1500} theme='dark' />
      </body>
    </html>
  );
}
