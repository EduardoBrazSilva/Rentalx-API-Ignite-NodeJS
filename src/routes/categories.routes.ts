import { Router } from 'express';
import multer from 'multer';

// import { CategoriesRepository } from '../modules/cars/repositories/Categories.repository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();
// const categoriesRepository = new CategoriesRepository();
const upload = multer({
    dest: '.tmp',
});

categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };