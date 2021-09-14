
import { CarsReposiotryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepostioryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsReposiotryInMemory;
let specificationsRepostioryInMemory: SpecificationsRepostioryInMemory

describe('Create Car Specification', ()=> {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsReposiotryInMemory();
    specificationsRepostioryInMemory = new SpecificationsRepostioryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepostioryInMemory);
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

    const specification = await specificationsRepostioryInMemory.create({
      description: 'test',
      name: 'test'
    })

    const specifications_id = [specification.id];
     const specificationsCars = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id});

     expect(specificationsCars).toHaveProperty("specifications");
     expect(specificationsCars.specifications.length).toBe(1);
  })
  it('Should Not Be Able to add a new specification to a non existent car',  async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];
    await expect(
      await createCarSpecificationUseCase.execute({car_id, specifications_id})
    ).rejects.toEqual(new AppError('Car dos not exists!'))
  })
  
})