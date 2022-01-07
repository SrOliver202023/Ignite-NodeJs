import 'reflect-metadata';
import { container } from "tsyringe";

import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ISpecificationsRepository } from "../../modules/cars/repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { IUsersRepository } from '../../modules/accounts/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepositories';

import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';

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

// iCarsRepository
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
);

// iCarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);