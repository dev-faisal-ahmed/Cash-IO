import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { transactionServices } from './services/transaction.services';

const createTransaction = tryCatch(async (req, res) => {
  const newTransaction = await transactionServices.createTransaction(
    req.user,
    req.body
  );

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transaction Added Successfully',
    data: newTransaction,
  });
});

const getTransactions = tryCatch(async (req, res) => {
  const transactions = await transactionServices.getTransactions(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transaction Retrieved Successfully',
    data: transactions,
  });
});

export const transactionController = { createTransaction, getTransactions };
