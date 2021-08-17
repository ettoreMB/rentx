
import { CarsReposiotryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsReposiotryInMemory;

describe('Create Car Specification', ()=> {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsReposiotryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  })

  it('Should Be Able to add a new specification to car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'fake description',
      daily_rent: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'FAKE BRAND',
      category_id: "category_id",
    })

    const specifications_id = ['54321'];
     await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});
  })

  it('Should Not Be Able to add a new specification to a non existent car',  async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];
      await createCarSpecificationUseCase.execute({car_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError);
  })
})