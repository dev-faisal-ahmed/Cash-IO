import Link from 'next/link';
import { IoWallet } from 'react-icons/io5';

export function Logo() {
  return (
    <Link
      href={'/'}
      className='title flex cursor-pointer items-center gap-3 whitespace-nowrap text-xl font-bold tracking-tight text-indigo-700 dark:text-indigo-500 sm:text-3xl'
    >
      <IoWallet />
      Cash-IO
    </Link>
  );
}
