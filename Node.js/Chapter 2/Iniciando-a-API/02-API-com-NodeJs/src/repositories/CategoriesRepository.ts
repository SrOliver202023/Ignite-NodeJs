import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];
    constructor() {
        this.categories = [];
    }

    create({ description, name }: ICreateCategoryDTO): void {
        const newCategory = new Category();
        Object.assign(newCategory, {
            name,
            description,
        });

        this.categories.push(newCategory);
    }
}

export { CategoriesRepository };
