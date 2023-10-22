import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserIcon } from './user-icon';
import { Adder } from './adder/adder';

export async function TopBar() {
  return (
    <nav className='border-b border-gray-300 bg-white py-3 shadow dark:border-gray-700 dark:bg-[#1f1f1f]'>
      <section className='flex items-center gap-5 px-2 sm:container'>
        <Logo />
        <div className='ml-auto' />
        <Adder />
        <ThemeToggle />
        <UserIcon />
      </section>
    </nav>
  );
}
