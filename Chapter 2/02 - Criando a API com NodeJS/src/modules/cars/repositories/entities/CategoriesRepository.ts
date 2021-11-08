import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../interfaces/ICategoriesRepository";

// singleton

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) CategoriesRepository.INSTANCE = new CategoriesRepository();
    return CategoriesRepository.INSTANCE;
  };

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  }
  list(): Category[] {
    return this.categories;
  }
  findByName(name: string): Category {
    const categoryFound = this.categories.find(category => category.name === name);
    return categoryFound;
  }
}

export { CategoriesRepository };