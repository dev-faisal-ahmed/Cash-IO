import Link from 'next/link';
import { IoWallet } from 'react-icons/io5';

export function Logo() {
  return (
    <Link
      href={'/'}
      className='title center-y flex cursor-pointer gap-3 text-3xl font-bold text-indigo-700 dark:text-indigo-500'
    >
      <IoWallet />
      Cash-IO
    </Link>
  );
}
