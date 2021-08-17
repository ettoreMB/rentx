import {Router} from 'express';
import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController';

import { ListAvaialablesCarsController } from '@modules/cars/UseCases/ListAvailableCars/ListAvailablesCarsController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureaAdmin } from '../middlewares/ensureAdmin';



const carsRoutes = Router()

const createCarController = new CreateCarController();

const lisAvailablesCars = new ListAvaialablesCarsController();

carsRoutes.post('/', ensureAuthenticate, ensureaAdmin, createCarController.handle);
carsRoutes.get('/available', lisAvailablesCars.handle );

export { carsRoutes }