import { OAuth2Client } from 'google-auth-library';
import { SendSuccessResponse, TryCatch } from '../../../utils';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../../../config';

export const GenerateAuthUrl = TryCatch(async (_, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const redirectUrl = 'http://localhost:5000/oauth';
  const oAuthClient = new OAuth2Client(
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    redirectUrl
  );

  const url = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
    prompt: 'consent',
  });

  SendSuccessResponse(res, {
    status: 200,
    message: 'Authorized Url Retrieved Successfully',
    data: { url },
  });
});
