import 'reflect-metadata';

import { request, Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { listCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';
const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});


categoriesRoutes.post('/', createCategoryController);
categoriesRoutes.post('/import', upload.single('file'), importCategoryController);
categoriesRoutes.get('/', listCategoriesController);


export { categoriesRoutes };