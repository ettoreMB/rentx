import {Request, Response} from 'express'

class ListByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    return res.json()
  }
}
export {ListByUserController}