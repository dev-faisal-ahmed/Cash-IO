import { OAuth2Client } from 'google-auth-library';
import { TryCatch } from '../../../utils';
import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '../../../config';

export const OAuth = TryCatch(async (req, res) => {
  const { code } = req.query;
  const redirectUrl = 'http://localhost:5000/api/v1/oauth';
  const oAuth = new OAuth2Client(
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    redirectUrl
  );

  const response = await oAuth.getToken(code as string);
  await oAuth.setCredentials(response.tokens);
  const user = oAuth.credentials;
  console.log({ user });
});
