import { Router } from 'express';

import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { createCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { listAvaibleCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { createCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';


const carsRoutes = Router();

carsRoutes.post('/',
  ensureAuhtenticated,
  ensureAdmin,

  createCarController);

carsRoutes.get('/available', listAvaibleCarsController);

carsRoutes.post('/specifications/:id',

  ensureAuhtenticated,
  ensureAdmin,
  createCarSpecificationController);


export { carsRoutes };