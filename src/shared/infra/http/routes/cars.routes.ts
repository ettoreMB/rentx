import {Router} from 'express';
import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureaAdmin } from '../middlewares/ensureAdmin';


const carsRoutes = Router()

const createCarController = new CreateCarController();


carsRoutes.post('/', ensureAuthenticate, ensureaAdmin, createCarController.handle);

export { carsRoutes }