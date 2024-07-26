import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { Source } from '../source.model';
import { TEditSourcePayload } from '../source.validation';

export const editSource = async (
  walletId: string,
  payload: TEditSourcePayload
) => {
  const doesSourceExist = await Source.findOne({ _id: walletId });
  if (!doesSourceExist)
    throw new AppError('Source Does Not Exist', StatusCodes.NOT_FOUND);

  const updatedSource = await Source.updateOne(
    { _id: walletId },
    { $set: { ...payload } }
  );

  return updatedSource;
};
