import { CreateSpecificationController } from "@modules/cars/UseCases/CreateSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureaAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";



const specificationsRoutes =  Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticate);
specificationsRoutes.post('/' ,ensureAuthenticate, ensureaAdmin, createSpecificationController.handle);


export { specificationsRoutes }