import { CarImage } from "../infra/typeorm/entities/CarImage";


interface ICarsImagesReposiory {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesReposiory }