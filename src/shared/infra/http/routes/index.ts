import { Router } from "express";

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specificaions.routes';
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";

const router = Router();
router.use(authenticateRoutes)
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes)

export { router }
