
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>;

  constructor(parameters) {
    this.repository = getRepository(Rental)
  }
  
  async create({  
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental =  this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
  })
  await this.repository.save(rental)
  
  return rental
}

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openCar = await this.repository.findOne({
      where: { car_id, end_date: null},
    })
    return openCar;
    
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: {user_id, end_date: null}
    })
    
    return openByUser;
    
  }

  async findById(id: string): Promise<Rental> {
   const rental =  await this.repository.findOne(id)

   return rental
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {user_id},
      relations: ["car"],
    });

    return rentals;
  }
}

export {RentalsRepository}