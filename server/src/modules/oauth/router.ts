import { Router } from 'express';
import { OAuthController } from './controller';

export const OAuthRouter = Router();
OAuthRouter.get('/', OAuthController.OAuth);
OAuthRouter.get('/auth-url', OAuthController.GenerateAuthUrl);
