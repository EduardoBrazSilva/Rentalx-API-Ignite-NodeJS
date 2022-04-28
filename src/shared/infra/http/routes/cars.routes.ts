import { Router } from 'express';

import { CreateCarsController } from '@modules/cars/useCases/createCars/CreateCarsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarsController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);
export { carsRoutes };
