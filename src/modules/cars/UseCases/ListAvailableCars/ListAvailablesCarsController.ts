import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { ListAvailablesCarsUseCase } from "./ListAvailablesCarsUseCase";

class ListAvaialablesCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const  { brand, name, category_id } = req.query;

    const listAvailablesCarsUseCase = container.resolve(ListAvailablesCarsUseCase);

    const cars = await listAvailablesCarsUseCase.execute(
      { 
        brand: brand as string, 
        name: name as string, 
        category_id: category_id as string,
      });

      return res.json(cars)
  }
}

export { ListAvaialablesCarsController}