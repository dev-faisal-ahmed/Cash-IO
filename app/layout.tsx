import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@/next-auth/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
});

export const metadata: Metadata = {
  title: 'Cash-IO',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body className={font.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
