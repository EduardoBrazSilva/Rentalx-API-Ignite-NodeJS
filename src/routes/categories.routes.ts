import { Router } from 'express';
import multer from 'multer';

// import { CategoriesRepository } from '../modules/cars/repositories/Categories.repository';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
// const categoriesRepository = new CategoriesRepository();
const upload = multer({
    dest: '.tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
);

export { categoriesRoutes };
