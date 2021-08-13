import { CategoriresRepositoryInMemory } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository';
import { AppError } from '../../../../shared/errors/AppErrors';   
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

 let createCategoryUseCase: CreateCategoryUseCase;
 let categoriresRepositoryInMemory: CategoriresRepositoryInMemory;

 beforeEach(() => {
  categoriresRepositoryInMemory = new CategoriresRepositoryInMemory();
  createCategoryUseCase = new CreateCategoryUseCase(categoriresRepositoryInMemory);
 })
describe('Create Category Tests', () => {
  it('Should be able to Create a new Category Correctly', async () => {
    const category = {
      name: 'Category test',
      description: 'Category Description',
    }
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreate = await categoriresRepositoryInMemory.findByName(category.name);
    console.log(categoryCreate)
    expect(categoryCreate).toHaveProperty("id")
  });

  it('Should not be able to create Category if  already Exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category Description',
      }
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
  
    }).rejects.toBeInstanceOf(AppError)
    
  })
})