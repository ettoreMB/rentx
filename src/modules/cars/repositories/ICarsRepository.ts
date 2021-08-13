import { ICreatecarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreatecarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
} 

export { ICarsRepository}