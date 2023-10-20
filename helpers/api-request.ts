import { serverAddress } from '@/data/server-address';

export async function getWallets(email: string) {
  const url = `${serverAddress}/api/get-wallets?email=${email}`;
  const response = await fetch(url, { cache: 'no-store' }).then((res) =>
    res.json(),
  );

  return response.ok ? response.data : [];
}

export async function getCategories(email: string) {
  const url = `${serverAddress}/api/get-categories?email=${email}`;
  const response = await fetch(url, { cache: 'no-store' }).then((response) =>
    response.json(),
  );
  return response.data || [];
}
