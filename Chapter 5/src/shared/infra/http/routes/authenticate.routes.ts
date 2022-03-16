import { Router } from 'express';
import { authenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { refreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';


const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', authenticateUserController);
authenticateRoutes.post('/refresh-token', refreshTokenController);

export { authenticateRoutes };     