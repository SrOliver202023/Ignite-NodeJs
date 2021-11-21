import { Router } from 'express';
import { authenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', authenticateUserController);

export { authenticateRoutes };