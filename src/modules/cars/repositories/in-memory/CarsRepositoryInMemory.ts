
import { ICreatecarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";


class CarsReposiotryInMemory  implements ICarsRepository {
 

  cars: Car[]= [];

  async create({
    id,
    brand,
    category_id,
    daily_rent,
    description,
    fine_amount,
    name,
    specifications
  }: ICreatecarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      id,
      category_id,
      daily_rent,
      description,
      fine_amount,
      name,
      specifications
    })

    this.cars.push(car);

    return car;
  }

 async  findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?:string,
    category_id?: string,
    name?: string,
    ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (car.available === true ||    
          (brand && car.brand === brand) || 
          (name && car.name === name ) ||
          (category_id && car.category_id === category_id)
        ) {
          return car;
        }
          return null
      })
      return cars;   
  }
  
  async findById(id:string):Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
 
 
}

export { CarsReposiotryInMemory }