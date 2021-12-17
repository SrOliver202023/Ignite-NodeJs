import { Router } from 'express';
import { createCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { listAvaibleCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

carsRoutes.post('/',
  // ensureAdmin,
  // ensureAuhtenticated,

  createCarController);
carsRoutes.get('/available', listAvaibleCarsController);



export { carsRoutes };