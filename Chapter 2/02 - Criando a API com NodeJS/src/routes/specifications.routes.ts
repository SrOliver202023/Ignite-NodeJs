import { Router } from 'express';
const specificationsRoutes = Router();

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationController } from '../modules/cars/useCases/listSpecification';

specificationsRoutes.post('/', (req, res) => createSpecificationController.handle(req, res));

specificationsRoutes.get('/', (req, res) => listSpecificationController.handle(req, res));

export { specificationsRoutes };