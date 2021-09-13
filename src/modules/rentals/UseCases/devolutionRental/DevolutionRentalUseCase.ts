import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase{
  constructor(
    @inject("RentalsRepository")
    private retanlsReposiroty: IRentalsRepository,
    @inject("CarsRepository")
    private carsRespository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ){

  }


  async execute({id, }: IRequest):Promise<Rental> {
    const minimum_Daily =  1
    const rental =  await this.retanlsReposiroty.findById(id);
    const car = await this.carsRespository.findById(rental.car_id);
    
    if(!rental){
      throw new AppError('Rental does not exists!')
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if( daily <= 0) {
      daily = minimum_Daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if( delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine
    }

    total += daily * car.daily_rent;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.retanlsReposiroty.create(rental);
    await this.carsRespository.updateAvailable(car.id, true);

    return rental
    
  }
}

export {DevolutionRentalUseCase}