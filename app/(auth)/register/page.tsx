import { Metadata } from 'next';
import { Register } from './_components/register';

export const metadata: Metadata = {
  title: 'Cash-IO | Register',
};

export default function RegisterPage() {
  return <Register />;
}
