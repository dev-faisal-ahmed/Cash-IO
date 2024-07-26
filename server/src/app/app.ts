import express from 'express';
import cors from 'cors';
import { AppRouter } from './router';
import { GlobalErrorHandler } from '../middlewares';

export const App = express();

// parser
App.use(express.json());
App.use(cors());

// all routes
App.use('/api/v1', AppRouter);

App.get('/', async (_, res) => {
  res.status(200).json({ ok: true, message: 'Server is running' });
});

App.get('*', async (_, res) => {
  res.status(400).json({ ok: false, message: 'Can not find this page' });
});

// global error handler
App.use(GlobalErrorHandler);
