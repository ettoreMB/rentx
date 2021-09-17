import {Router} from 'express';
import multer from 'multer';
import uploadConfig from "@config/upload";

import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController';
import { ListAvaialablesCarsController } from '@modules/cars/UseCases/ListAvailableCars/ListAvailablesCarsController';
import { CreateSpecificationCarController } from '@modules/cars/UseCases/CreateCarSpecification/CreateSpecificationCarController';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { ensureaAdmin } from '../middlewares/ensureAdmin';
import { UploadCarImageController } from '@modules/cars/UseCases/UploadCarImages/UploadCarImagesController';


const upload = multer(uploadConfig)

const carsRoutes = Router()

/*Controllers */
const createCarController = new CreateCarController();

const lisAvailablesCars = new ListAvaialablesCarsController();

const createSpecificationCarController = new CreateSpecificationCarController();

const uploadCarsImagesUploadController = new UploadCarImageController();


/* Routes */

carsRoutes.post('/', createCarController.handle);

carsRoutes.post('/images/:id', upload.array("images"),uploadCarsImagesUploadController.handle)
 
carsRoutes.get('/available', lisAvailablesCars.handle );



carsRoutes.post('/specifications/:id', 
  createSpecificationCarController.handle
)

export { carsRoutes }