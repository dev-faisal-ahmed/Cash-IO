import { toast } from '@/components/ui/use-toast';

export function errorToast(msg = 'Something went wrong') {
  toast({
    title: msg,
    variant: 'destructive',
    duration: 1000,
  });
}

export function generalToast(msg: string, ok: boolean) {
  toast({
    title: msg,
    variant: ok ? 'default' : 'destructive',
    duration: 1000,
  });
}
