import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import  {CreateSpecificationController}  from "../modules/cars/UseCases/CreateSpecification/CreateSpecificationController";


const specificationsRoutes =  Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticate);
specificationsRoutes.post('/', createSpecificationController.handle);


export { specificationsRoutes }