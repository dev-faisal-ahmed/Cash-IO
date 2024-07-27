import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <main className='flex h-full items-center justify-center'>
      <div className='rounded-md border border-neutral-300 p-6 shadow-md'>
        <h1 className='mb-6 text-2xl font-semibold'>Cash-IO</h1>
        <Button>Login With Google</Button>
      </div>
    </main>
  );
}
