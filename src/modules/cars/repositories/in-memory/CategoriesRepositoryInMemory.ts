import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriresRepositoryInMemory implements ICategoriesRepository {

  categorires: Category[] = [];


  async findByName(name: string): Promise<Category> {
    const category = this.categorires.find(category => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const all = this.categorires;
    return all

  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categorires.push(category)
  }

}

export { CategoriresRepositoryInMemory}