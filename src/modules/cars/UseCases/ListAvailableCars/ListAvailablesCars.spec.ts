import { CarsReposiotryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailablesCarsUseCase} from "./ListAvailablesCarsUseCase"

let inMemoryCarsRepository: CarsReposiotryInMemory;
let listAvailablesCarsUseCase: ListAvailablesCarsUseCase;



describe( 'List Cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new CarsReposiotryInMemory();
    listAvailablesCarsUseCase = new ListAvailablesCarsUseCase(inMemoryCarsRepository);
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


    const cars = await listAvailablesCarsUseCase.execute({})
     
    expect(cars).toEqual([car])
  });

  it('shoulb be list all availablecars by name', async() => {
   const car = await inMemoryCarsRepository.create({
      name: "fake car2",
      description: "fake description1",
      daily_rent: 100,
      license_plate : "ABCD-126",
      fine_amount: 60,
      brand : "FAKE Brand Test",
      category_id : "fake category"
    })


    const cars = await listAvailablesCarsUseCase.execute({    
      name: 'fake car2',

    });

    expect(cars).toEqual([car])
  });

  it('shoulb be list all availablecars by category', async() => {
    const car = await inMemoryCarsRepository.create({
       name: "fake car2",
       description: "fake description1",
       daily_rent: 100,
       license_plate : "ABCD-126",
       fine_amount: 60,
       brand : "FAKE Brand Test",
       category_id : "fake category2"
     })
 
 
     const cars = await listAvailablesCarsUseCase.execute({    
      category_id: 'fake category2',
 
     });
 
     expect(cars).toEqual([car])
   })
})