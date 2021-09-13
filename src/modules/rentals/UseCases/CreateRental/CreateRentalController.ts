import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expected_return_date, car_id} = req.body;
    const {id} = req.user;

    const rental = container.resolve(CreateRentalUseCase);

    await rental.execute({
      expected_return_date,
      car_id,
      user_id: id,
    })
    return res.status(201).send(rental)
  }
}

export {CreateRentalController}