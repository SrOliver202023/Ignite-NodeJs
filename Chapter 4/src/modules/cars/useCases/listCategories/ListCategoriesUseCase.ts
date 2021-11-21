import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }

}

export { ListCategoriesUseCase };