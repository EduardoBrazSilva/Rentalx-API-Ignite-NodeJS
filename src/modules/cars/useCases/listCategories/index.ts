import { CategoriesRepository } from '../../repositories/implementations/Categories.repository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoryController = new ListCategoriesController(
    listCategoriesUseCase
);

export { listCategoryController };
