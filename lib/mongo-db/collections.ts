import { clientPromise } from './mongo-client';

export async function getCollections() {
  const client = await clientPromise;
  const db = client.db('cash-io');
  const usersCollections = db.collection('users');
  const transactionsCollections = db.collection('transactions');
  const categoriesCollections = db.collection('categories');
  const walletsCollection = db.collection('wallets');
  const transfersCollection = db.collection('transfers');

  return {
    usersCollections,
    transactionsCollections,
    categoriesCollections,
    walletsCollection,
    transfersCollection,
  };
}
