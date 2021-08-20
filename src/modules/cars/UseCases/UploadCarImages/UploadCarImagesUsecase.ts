import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,
  ) {}

  async execute({car_id, image_name}: IRequest): Promise<void>  {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
    })
  }
}

export {UploadCarImagesUseCase}