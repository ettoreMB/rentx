import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";


class CreateCarController {
  async handle(req:Request, res:Response):Promise<Response> {
    const {
      name,
      description,
      daily_rent,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = req.body

    const createCarUsecase = container.resolve(CreateCarUseCase)

    const car = await createCarUsecase.execute(
      {
        name,
        description,
        daily_rent,
        license_plate,
        fine_amount,
        brand,
        category_id,
      }
    );

    return res.status(200).json(car);
  }
}

export { CreateCarController}