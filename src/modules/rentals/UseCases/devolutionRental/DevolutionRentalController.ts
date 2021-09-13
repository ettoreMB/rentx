import { container } from 'tsyringe';

import {Response , Request} from 'express';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response):Promise<Response> {
    const {id: user_id } =  req.user;
    const { id  } = req.params;

    const devolutioncarUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutioncarUseCase.execute({id, user_id});

    return res.status(200).json(rental)

  }
}

export {DevolutionRentalController}