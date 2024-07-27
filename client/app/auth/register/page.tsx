import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cash-IO | Register',
};

export default function RegisterPage() {
  return (
    <main className='flex h-full items-center justify-center'>
      <div className='rounded-md border border-neutral-300 p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-semibold'>Cash-IO Register</h1>
        <form className='mb-4 flex flex-col gap-3'>
          <Input name='name' placeholder='Input Name' />
          <Input name='email' type='email' placeholder='Input Email' />
          <Input name='password' type='password' placeholder='Input Password' />
          <Button className='mt-2'>Register</Button>
        </form>
        <hr />
        <Button variant={'outline'} className='mt-4 w-full'>
          Login With Google
        </Button>
      </div>
    </main>
  );
}
