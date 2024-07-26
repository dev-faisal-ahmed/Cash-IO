import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../../utils/app.error';
import { TUser } from '../../user/user.interface';
import { Source } from '../source.model';
import { TCreateSourcePayload } from '../source.validation';

export const creteSource = async (
  user: TUser,
  payload: TCreateSourcePayload
) => {
  // checking if the source already exist or not
  const isSourceExist = await Source.findOne({
    name: payload.name,
    userId: user._id,
  });

  if (isSourceExist)
    throw new AppError('Source is already exists', StatusCodes.BAD_REQUEST);

  const newSource = await Source.create({ ...payload, userId: user._id });
  return newSource;
};
