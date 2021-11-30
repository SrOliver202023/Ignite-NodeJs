import { Router } from 'express';
import { createCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

carsRoutes.post('/',
  // ensureAdmin,
  // ensureAuhtenticated,

  createCarController);

export { carsRoutes };