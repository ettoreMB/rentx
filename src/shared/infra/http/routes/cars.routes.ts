import {Router} from 'express';
import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController';



import { ListAvaialablesCarsController } from '@modules/cars/UseCases/ListAvailableCars/ListAvailablesCarsController';
import { CreateSpecificationCarController } from '@modules/cars/UseCases/CreateCarSpecification/CreateSpecificationCarController';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureaAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router()

const createCarController = new CreateCarController();

const lisAvailablesCars = new ListAvaialablesCarsController();

const createSpecificationCarController = new CreateSpecificationCarController();

carsRoutes.post('/', 

  createCarController.handle
);
 
carsRoutes.get('/available', lisAvailablesCars.handle );

carsRoutes.post('/specifications/:id', 
  createSpecificationCarController.handle
)

export { carsRoutes }