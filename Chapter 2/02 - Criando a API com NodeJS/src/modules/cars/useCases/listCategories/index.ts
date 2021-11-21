import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { CategoriesRepository } from '../../repositories/entities/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };