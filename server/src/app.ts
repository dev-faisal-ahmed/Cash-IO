import express from 'express';
import cors from 'cors';
import { appRouter } from './router';
import { globalErrorHandler } from './middlewares/global-error.handler';

export const app = express();

// parser
app.use(express.json());
app.use(cors());

// all routes
app.use('/api', appRouter);

app.get('/', async (_, res) => {
  res.status(200).json({ ok: true, message: 'Server is running' });
});

// global error handler
app.use(globalErrorHandler);
