import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserIcon } from './user-icon';
import { uiData } from '@/data/uiData';
import { Adder } from './adder/adder';
import { getServerSession } from 'next-auth';
import { WalletOptionType, WalletType } from '@/lib/types';

export async function TopBar() {
  return (
    <nav
      style={{ height: uiData.topBarHeight }}
      className='border-b border-gray-300 bg-white py-3 shadow dark:border-gray-700 dark:bg-[#1f1f1f]'
    >
      <section className='container flex items-center gap-5'>
        <Logo />
        <div className='ml-auto' />
        <Adder />
        <ThemeToggle />
        <UserIcon />
      </section>
    </nav>
  );
}
