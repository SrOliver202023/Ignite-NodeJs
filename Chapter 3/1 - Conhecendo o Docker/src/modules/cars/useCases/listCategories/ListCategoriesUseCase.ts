import { ICategoriesRepository } from '../../repositories/interfaces/ICategoriesRepository';
import { Category } from '../../entities/Category';
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