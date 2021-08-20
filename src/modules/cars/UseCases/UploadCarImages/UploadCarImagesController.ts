import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUsecase";



interface IFiles {
 filename: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    const fileNames = images.map((file) => file.filename);
    
    await uploadCarImageUseCase.execute(
      {
        car_id: id,
        image_name: fileNames
      });
      console.log(images)
    return res.status(201).send()
  }
}

export {UploadCarImageController}