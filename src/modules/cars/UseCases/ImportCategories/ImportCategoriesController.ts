import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";


class ImportCategoriesController {
 

 async  handle ( req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importCategoryUseCase = container.resolve(ImportCategoriesUseCase);

    await importCategoryUseCase.execute(file);
    
    return res.send();
  }
}


export{ ImportCategoriesController}