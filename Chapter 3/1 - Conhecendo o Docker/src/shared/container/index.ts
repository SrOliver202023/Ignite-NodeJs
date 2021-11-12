import { container } from "tsyringe";

import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

import { ISpecificationsRepository } from "../../modules/cars/repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";



// iCategoryRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);


// iCategoryRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);