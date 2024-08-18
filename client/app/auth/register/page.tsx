import Image from 'next/image';
import * as card from '@/components/ui/card';
import { Metadata } from 'next';
import { RegisterForm } from './_form/RegisterForm';
import { Container } from '@/components/shared/Container';
import { guardLoggedUser } from '@/app/_actions/authGuard';

export const metadata: Metadata = {
  title: 'Cash-IO | Register',
};

export default async function RegisterPage() {
  // guard
  await guardLoggedUser();

  return (
    <main className='h-full'>
      <Container className='flex h-full justify-center'>
        <div className='hidden w-full items-center justify-center lg:flex'>
          <Image
            className='w-full max-w-[550px]'
            src={'/images/manage-money.svg'}
            width={1000}
            height={1000}
            alt='Cover'
          />
        </div>
        <div className='flex w-full flex-col items-center justify-center text-center lg:border-l'>
          <card.CardTitle className='text-2xl'>
            Welcome to Cash-IO
          </card.CardTitle>
          <card.CardDescription className='mt-2'>
            Provide your information and register
          </card.CardDescription>
          <RegisterForm />
        </div>
      </Container>
    </main>
  );
}
