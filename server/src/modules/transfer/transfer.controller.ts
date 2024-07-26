import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { transferServices } from './services/transfer.services';

const createTransfer = tryCatch(async (req, res) => {
  const newTransfer = await transferServices.createTransfer(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transfer was successful',
    data: newTransfer,
  });
});

const getTransfers = tryCatch(async (req, res) => {
  const transfers = await transferServices.getTransfers(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Transfer Retrieved Successfully',
    data: transfers,
  });
});

export const transferController = { createTransfer, getTransfers };
