import 'reflect-metadata';
import { Router } from 'express';
const specificationsRoutes = Router();

import { createSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { listSpecificationController } from '../modules/cars/useCases/listSpecification/ListSpecificationController';

import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

specificationsRoutes.use(ensureAuhtenticated);
specificationsRoutes.post('/', createSpecificationController);

specificationsRoutes.get('/', listSpecificationController);

export { specificationsRoutes };