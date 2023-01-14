import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/accounts/useCases/CreateUser/createUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import { ProfileUserController } from '@modules/cars/useCases/profileUserUseCase/ProfileUserController';

import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
