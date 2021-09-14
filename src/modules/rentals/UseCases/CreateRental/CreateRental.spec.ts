  
import dayjs, { Dayjs } from 'dayjs' 

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsReposiotryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { DayJSDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayJSDateProvider';


let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsReposiotryInMemory;
let dayjsDateProvider: DayJSDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Rentals Tests', () => {
  const Add24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    dayjsDateProvider = new DayJSDateProvider()
    carsRepositoryInMemory = new CarsReposiotryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase =  new CreateRentalUseCase( rentalsRepositoryInMemory,carsRepositoryInMemory, dayjsDateProvider );
  })

  it(" should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rent: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: Add24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it(" should not be able to create a new rental if there is another open to the same user ", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: '1234',
      expected_return_date: Add24Hours,
      user_id: "12345"
    })

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: Add24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it(" should not be able to create a new rental if there is another open to the same car ", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: Add24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: Add24Hours,
      })
    ).rejects.toEqual(new AppError("This Cars Is Unavailable!"));
  });

  it(" should not be able to create a new rental with invalid return time ", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid Return Time"));
  });
});