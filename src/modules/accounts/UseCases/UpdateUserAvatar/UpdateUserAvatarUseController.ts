import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase copy";

class  UpdateUserAvatarController { 

 async handle(req: Request, res: Response):Promise<Response> {

  const { id } = req.user

  const avatar_file = req.file.filename;

  const updatadeUserAvatarUserCase = container.resolve(UpdateUserAvatarUseCase)

  await updatadeUserAvatarUserCase.execute({user_id: id, avatar_file});
    

  return res.status(200).send();
  
  
  }
}

export {UpdateUserAvatarController}