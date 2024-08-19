import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Wallet } from '../model';
import { addWalletSchema } from '../validation';

export const addWallet = catchAsync(async (req, res) => {
  // validation
  const payload = await addWalletSchema.parseAsync(req.body);
  const user = req.user;

  // creating a wallet
  const wallet = await Wallet.create({ ...payload, userId: user._id });

  // sending response
  return sendSuccessResponse(res, {
    status: 200,
    message: 'Wallet created successfully',
    data: wallet,
  });
});
