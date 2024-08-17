import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../helpers/response.helper';
import { tryCatch } from '../../middlewares/asyncHandler';
import { lendServices } from './services/lend.services';

const createLend = tryCatch(async (req, res) => {
  const newLend = await lendServices.createLend(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: `${req.body.type} was successful`,
    data: newLend,
  });
});

export const lendController = { createLend };
