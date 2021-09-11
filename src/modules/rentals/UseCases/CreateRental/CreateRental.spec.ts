import dayjs, { Dayjs } from 'dayjs' 

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsReposiotryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { DayJSDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayJSDateProvider';


let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsReposiotryInMemory;
let dayjsDateProvider: DayJSDateProvider;
let createRentalUsecase: CreateRentalUseCase;

describe('Rentals Tests', () => {
  const Add24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    dayjsDateProvider = new DayJSDateProvider()
    carsRepositoryInMemory = new CarsReposiotryInMemory()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUsecase =  new CreateRentalUseCase( rentalsRepositoryInMemory,carsRepositoryInMemory, dayjsDateProvider );
  })

  it('should be able to create a new rental',async () => {
    const rental = await createRentalUsecase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: Add24Hours,
    })
    console.log(rental)
    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")


  });

  it('should not be able to create new rental if user already has a rental',() => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: 'fakeUser',
        car_id: 'fakeCar',
        expected_return_date: Add24Hours,
      });
  
      const rental = await createRentalUsecase.execute({
        user_id: 'fakeUser',
        car_id: 'fakeCar',
        expected_return_date: Add24Hours,
      });
    }).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create new rental if car is not available',() => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: '12345',
        car_id: '123123',
        expected_return_date: Add24Hours,
      });
  
      const rental = await createRentalUsecase.execute({
        user_id: '12345',
        car_id: '123123',
        expected_return_date: Add24Hours,
      });
    }).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create new rental with invalid return time',() => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: '12345',
        car_id: '123123',
        expected_return_date: dayjs().toDate(),
      });
  
     
    }).rejects.toBeInstanceOf(AppError)

  });

})