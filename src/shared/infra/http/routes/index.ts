import { Router } from "express";

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specificaions.routes';
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();
router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/password", passwordRoutes)

export { router }
