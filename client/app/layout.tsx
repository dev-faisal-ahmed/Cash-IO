import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { Montserrat } from 'next/font/google';
import { ReduxProvider } from './_redux/Provider';
import './globals.css';

const font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cash-IO',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className='dark'>
      <body className={cn(font.className)}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster richColors duration={1500} theme='dark' />
      </body>
    </html>
  );
}
