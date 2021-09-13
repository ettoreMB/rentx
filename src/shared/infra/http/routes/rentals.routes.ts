import { CreateRentalController } from "@modules/rentals/UseCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/UseCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/UseCases/ListByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/',ensureAuthenticate,  createRentalController.handle)
rentalsRoutes.post('/devolution/:id',ensureAuthenticate,  devolutionRentalController.handle)
rentalsRoutes.get('/user/:id', ensureAuthenticate, listRentalsByUserController.handle)

export {rentalsRoutes}