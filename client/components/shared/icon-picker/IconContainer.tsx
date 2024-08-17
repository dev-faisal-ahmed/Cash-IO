import { icons } from './icons';

type TProps = {
  name: string;
  className?: string;
};

export const IconContainer = ({ name, className }: TProps) => {
  return <span className={className}>{icons[name]}</span>;
};
