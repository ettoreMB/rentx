import { Category } from "../infra/typeorm/entities/Category";

//DTO - DATA TRNANFER OBJECT

interface ICreateCategoryDTO {
  name: string;
  description: string;
}


interface ICategoriesRepository {
  findByName(name: string) :Promise<Category>;
  list(): Promise<Category[]>;
  create({name, description}: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO}