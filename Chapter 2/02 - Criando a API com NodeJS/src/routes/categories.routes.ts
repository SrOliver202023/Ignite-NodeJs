import { Router, request as req, response as res } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => createCategoryController.handle(req, res));
categoriesRoutes.get('/', (req, res) => listCategoriesController.handle(req, res));

export { categoriesRoutes };