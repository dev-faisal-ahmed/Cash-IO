import { Metadata } from 'next';
import { AddCategoryForm } from './_form/AddCategoryForm';

export const metadata: Metadata = {
  title: 'Cash-IO | Add Category',
};

export default function AddCategoryPage() {
  return (
    <main>
      <AddCategoryForm />
    </main>
  );
}
