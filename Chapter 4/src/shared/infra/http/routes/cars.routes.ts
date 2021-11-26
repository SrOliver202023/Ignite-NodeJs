import { Router } from 'express';
import { createCarController } from '@modules/cars/useCases/createCar/CreateCarController';
const carsRoutes = Router();

carsRoutes.post('/', createCarController);

export { carsRoutes };