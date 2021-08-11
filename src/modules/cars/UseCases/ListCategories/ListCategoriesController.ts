import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

   async  handle(req: Request, res : Response): Promise<Response> {
      const listCategoriesUserCase = container.resolve(ListCategoriesUseCase)
      const all = await listCategoriesUserCase.excute();

      return res.json(all);
    }
  
}

export { ListCategoriesController }