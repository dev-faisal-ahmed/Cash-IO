import { StatusCodes } from 'http-status-codes';
import { sendSuccessResponse } from '../../utils/response.helper';
import { userServices } from './services/user.services';
import { tryCatch } from '../../utils/try-catch';

const registerUser = tryCatch(async (req, res) => {
  const newUser = await userServices.registerUser(req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'User Created Successfully',
    data: newUser,
  });
});

const loginUser = tryCatch(async (req, res) => {
  const userData = await userServices.loginUser(req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'User Successfully Logged In',
    data: userData,
  });
});

const updateProfile = tryCatch(async (req, res) => {
  const updatedInfo = await userServices.updateProfile(req.user, req.body);

  sendSuccessResponse(res, {
    status: StatusCodes.OK,
    message: 'User Profile Updated!',
    data: updatedInfo,
  });
});

export const userController = { registerUser, loginUser, updateProfile };
