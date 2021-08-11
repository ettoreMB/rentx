import { CreateCategoryController } from "@modules/cars/UseCases/CreateCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/UseCases/ImportCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/UseCases/ListCategories/ListCategoriesController";
import { Router } from "express";
import multer from 'multer'


const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});


const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/',  createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };