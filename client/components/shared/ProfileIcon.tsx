type TProps = {
  size?: number;
  imageUrl?: string;
  name: string;
};

export const ProfileIcon = ({ name, imageUrl, size = 40 }: TProps) => {
  return (
    <div
      className='flex items-center justify-center rounded-full bg-primary text-2xl font-bold text-white'
      style={{ height: size, width: size }}
    >
      {name?.[0]}
    </div>
  );
};
