import { CarsReposiotryInMemory } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsReposiotryInMemory;

describe('create car', ( )=> {

beforeEach(() => {
  carsRepositoryInMemory = new CarsReposiotryInMemory();
  createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
})

  it('should be able to create a new car',async () => {
   const car =  await createCarUseCase.execute({
      name: 'fake car',
      description: 'fake description',
      daily_rent: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'FAKE BRAND',
      category_id: "category_id",
    });
    expect(car).toHaveProperty('id')
  })

  it('Should note be able to create a alredy register car license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'fake description',
        daily_rent: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'FAKE BRAND',
        category_id: "category_id",
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'fake description',
        daily_rent: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'FAKE BRAND',
        category_id: "category_id",
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Car shoulb be created with available true by default', async () => {
     const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'fake description',
      daily_rent: 100,
      license_plate: 'ABCD-123',
      fine_amount: 60,
      brand: 'FAKE BRAND',
      category_id: "category_id",
    });

    expect(car.available).toBe(true);
  })
})