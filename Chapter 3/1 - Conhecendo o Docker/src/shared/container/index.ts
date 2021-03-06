import 'reflect-metadata';
import { container } from "tsyringe";

import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

import { ISpecificationsRepository } from "../../modules/cars/repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";

import { IUsersRepository } from '../../modules/accounts/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementatios/UsersRepositories';

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

// iUsersRepository
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);