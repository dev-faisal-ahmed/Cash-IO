import { ChangeEvent } from 'react';
import { CgOptions } from 'react-icons/cg';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useGetIcons } from '@/hooks/use-get-icons';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

type IconPickerProps = {
  className?: string;
  handleSelection: (iconKey: string) => void;
};

export function IconPicker({ className, handleSelection }: IconPickerProps) {
  const { icons, handleFiler, selectedIcon, allIconsData } = useGetIcons();

  function onFilter(e: ChangeEvent<HTMLInputElement>) {
    handleFiler(e.target.value);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex h-10 items-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-sm font-semibold',
          className,
        )}
      >
        <CgOptions size={20} /> Choose Icon {allIconsData[selectedIcon]}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[240px] bg-gray-100 dark:bg-[#2f2f2f]'>
        <div className='flex items-center border-b px-3 '>
          <Search />
          <Input
            onChange={onFilter}
            className='border-0 bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
            placeholder='Search Icon ...'
          />
        </div>
        <div className='grid grid-cols-4 gap-3 p-3'>
          {Object.keys(icons).map((icon, index) => (
            <DropdownMenuItem
              onClick={() => handleSelection(icon)}
              className='flex cursor-pointer items-center justify-center rounded-md bg-white p-2 dark:bg-[#1f1f1f]'
              key={index}
            >
              {icons[icon]}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
