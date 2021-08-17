import { CarsReposiotryInMemory } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { ListCarsUseCase } from "./ListCarsUseCase"

let inMemoryCarsRepository: CarsReposiotryInMemory;
let listCarsUseCase: ListCarsUseCase;



describe( 'List Cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new CarsReposiotryInMemory();
    listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);
  })
  it('should be ble to list all availables cars', async () => {
    const car = await inMemoryCarsRepository.create({
      name: "fake car",
      description: "fake description1",
      daily_rent: 100,
      license_plate : "ABCD-126",
      fine_amount: 60,
      brand : "FAKE Brand",
      category_id : "fake category"
    })


    const cars = await listCarsUseCase.execute({})
     
    expect(cars).toEqual([car])
  });

  it('shoulb be list all availablecars by name', async() => {
   const car = await inMemoryCarsRepository.create({
      name: "fake car",
      description: "fake description1",
      daily_rent: 100,
      license_plate : "ABCD-126",
      fine_amount: 60,
      brand : "FAKE Brand Test",
      category_id : "fake category"
    })


    const cars = await listCarsUseCase.execute({
      brand: 'FAKE Brand Test',
      name: 'fake car',
      category_id: 'fake category'
    });

    expect(cars).toEqual([car])
  })
})