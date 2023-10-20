import * as Popover from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Dispatch, SetStateAction } from 'react';

type CalendarPopoverProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

export function CalendarPopover({ date, setDate }: CalendarPopoverProps) {
  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <div className='w-full cursor-pointer space-y-3'>
          <Label>Date</Label>
          <div className='flex w-full items-center justify-between rounded-md border px-3 py-2'>
            <span className='text-muted-foreground'>
              {date ? format(date, 'PPP') : 'Pick a date'}
            </span>
            <CalendarIcon className='h-5 w-5' />
          </div>
        </div>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className='w-auto p-0' align='center'>
        <Calendar mode='single' selected={date} onSelect={setDate} />
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}
