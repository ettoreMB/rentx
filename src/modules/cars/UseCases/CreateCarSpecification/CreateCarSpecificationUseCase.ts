import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppErrors";


interface IRequest {
  car_id: string;
  specifications_id: string[];
}

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    private specificationsRepository: ISpecificationRepository
  ){}

  async execute({car_id, specifications_id}:IRequest): Promise<void> {
    const carExists = this.carsRepository.findById(car_id)

    if(!carExists) {
      throw new AppError('Car dos not exists!');
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);
  }
}

export { CreateCarSpecificationUseCase}