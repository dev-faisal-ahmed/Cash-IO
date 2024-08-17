import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type TProps = PropsWithChildren & {
  className?: string;
};

export const Container = ({ children, className }: TProps) => {
  return <section className={cn('container', className)}>{children}</section>;
};
