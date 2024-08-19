import express from 'express';
import cors from 'cors';
import { appRouter } from './router';
import { globalErrorHandler } from '../middlewares';

export const app = express();

// parser
app.use(express.json());
app.use(cors());

// all routes
app.use('/api/v1', appRouter);

app.get('/', async (_, res) => {
  res.status(200).json({ ok: true, message: 'Server is running' });
});

app.all('*', async (_, res) => {
  res.status(400).json({ ok: false, message: 'This route does not exist' });
});

// global error handler
app.use(globalErrorHandler);
