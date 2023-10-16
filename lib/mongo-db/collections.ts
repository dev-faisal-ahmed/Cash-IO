import { mongoClient } from './mongo-client';

const db = mongoClient.db('cash-io');

export const usersCollection = db.collection('users');
export const transactionsCollection = db.collection('transactions');
export const categoriesCollection = db.collection('categories');
export const walletsCollection = db.collection('wallets');
export const transferHistoriesCollection = db.collection('transferHistories');
