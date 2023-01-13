import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarsController } from '@modules/cars/useCases/createCars/CreateCarsController';
import { CreateCarsSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarsSpecificationsController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationsController =
    new CreateCarsSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarsController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarsSpecificationsController.handle
);

carsRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImagesController.handle
);

export { carsRoutes };
