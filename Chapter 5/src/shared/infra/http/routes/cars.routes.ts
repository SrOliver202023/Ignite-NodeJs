import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';


import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { createCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { listAvaibleCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { createCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

import { uploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

const uploadCars = multer(uploadConfig);

const carsRoutes = Router();

carsRoutes.post('/',
  ensureAuhtenticated,
  ensureAdmin,

  createCarController);

carsRoutes.get('/available',
  listAvaibleCarsController);

carsRoutes.post('/specifications/:id',

  ensureAuhtenticated,
  ensureAdmin,
  createCarSpecificationController);

carsRoutes.post('/images/:id',
  ensureAuhtenticated,
  ensureAdmin,
  uploadCars.array("images"),
  uploadCarImagesController);

export { carsRoutes };