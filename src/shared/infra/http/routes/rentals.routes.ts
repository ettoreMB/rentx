import { CreateRentalController } from "@modules/rentals/UseCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.post('/',  createRentalController.handle)
rentalsRoutes.post('/devolution/:id',  devolutionRentalController.handle)


export {rentalsRoutes}