import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

export function UserInfo() {
  const { data } = useSession();
  return (
    <div className='grid grid-cols-7 items-start rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700'>
      <Avatar className='col-span-2'>
        <AvatarImage
          src={data?.user?.image as string}
          alt={data?.user?.name?.[0]}
        />
      </Avatar>
      <div className='col-span-5 w-full'>
        <div className='truncate'>{data?.user?.name}</div>
        <p className='w-full truncate text-xs'>{data?.user?.email}</p>
      </div>
    </div>
  );
}
