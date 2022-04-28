import { Router } from 'express';

import { CreateCarsController } from '@modules/cars/useCases/createCars/CreateCarsController';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();

carsRoutes.post('/', createCarsController.handle);
export { carsRoutes };
