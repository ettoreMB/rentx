import {Router} from 'express';
import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController';


const carsRoutes = Router()

const createCarController = new CreateCarController();


carsRoutes.post('/', createCarController.handle);

export { carsRoutes }