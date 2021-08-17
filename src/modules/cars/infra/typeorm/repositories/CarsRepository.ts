import { ICreatecarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rent,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreatecarDTO): Promise<Car> {
    
    const car = await this.repository.create({
      name,
      description,
      daily_rent,
      license_plate,
      fine_amount,
      brand,
      category_id,
    })

    this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
   const car = await  this.repository.findOne({license_plate})

   return car
  }

  async findAvailable(brand?: string, name?: string, category_id?: string,  ): Promise<Car[]> {
    const carsQuery = await this.repository
    .createQueryBuilder("c")
    .where("c.available = :available", { available: true });

    if(brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if(name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if(category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await  carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository}