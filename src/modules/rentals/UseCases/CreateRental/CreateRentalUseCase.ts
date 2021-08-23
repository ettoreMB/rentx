import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";



interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(

    private dateProvider: IDateProvider,
    private rentalsRepository: IRentalsRepository,
  ){}
  async execute({user_id, car_id, expected_return_date}:IRequest): Promise<Rental> {
    const minRentalHours = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable) {
      throw new AppError('This Cars Is Unavailable!')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(rentalOpenToUser) {
      throw new AppError('There is a rental in this user!')
    }


    //24h min rental
    
    const dateNow = this.dateProvider.dateNow()
    const compare = this.dateProvider.compareInHours(expected_return_date, dateNow)


    if(compare < minRentalHours) {
      throw new AppError('Invalid Return Time')
    }

    const rental = await this.rentalsRepository.create({car_id, user_id, expected_return_date})
    return rental;
    
  }
 }

export {CreateRentalUseCase}