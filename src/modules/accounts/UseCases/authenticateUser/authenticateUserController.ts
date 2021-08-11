import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserCase } from "./authenticateUserUseCase";



class AuthenticateUserController {
  async handle ( req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUserCase = container.resolve(AuthenticateUserCase);

    const token = await authenticateUserCase.execute({password, email});

    return res.json(token);
  } 
}

export { AuthenticateUserController }