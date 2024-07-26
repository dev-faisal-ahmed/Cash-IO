import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { tryCatch } from '../../utils/try-catch';
import { metaServices } from './services/meta.services';

const getMetaData = tryCatch(async (req, res) => {
  const metaData = await metaServices.getMetaData(req.user);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'Meta Data Retrieved Successfully',
    data: metaData,
  });
});

export const metaController = { getMetaData };
