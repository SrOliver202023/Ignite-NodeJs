import 'reflect-metadata';

import { Router } from 'express';
import multer from 'multer';

import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { createCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { listCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});



categoriesRoutes.post('/',
  ensureAuhtenticated,
  ensureAdmin,
  createCategoryController);

categoriesRoutes.post('/import', upload.single('file'),
  ensureAuhtenticated,
  ensureAdmin,
  importCategoryController);

categoriesRoutes.get('/', listCategoriesController);

export { categoriesRoutes };