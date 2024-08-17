import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IoWallet } from 'react-icons/io5';

type TProps = {
  className?: string;
};

export const Logo = ({ className }: TProps) => {
  return (
    <Link
      className={cn('flex items-center gap-3 text-3xl text-primary', className)}
      href={'/'}
    >
      <IoWallet />
      <span className='font-bold'>Cash-IO</span>
    </Link>
  );
};
