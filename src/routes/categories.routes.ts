import { Router } from 'express';
import multer from 'multer';

// import { CategoriesRepository } from '../modules/cars/repositories/Categories.repository';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();
// const categoriesRepository = new CategoriesRepository();
const upload = multer({
    dest: '.tmp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
