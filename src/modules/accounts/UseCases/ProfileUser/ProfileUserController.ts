import {Request, Response} from 'express'
import { container } from 'tsyringe';
import { ProfileUserUseCase } from './ProfileUserUseCase';

class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {id} = req.user;
    const profileUseCase = container.resolve(ProfileUserUseCase);
    const profile = profileUseCase.execute(id);

    return res.json(profile)
  }
}

export { ProfileUserController}