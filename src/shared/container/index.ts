import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/Categories.repository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { IRentalsRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalsRepository';
import { RentaslRepository as RentalsRepository } from '@modules/rentals/repositories/RentalsRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);
container.registerSingleton<ISpecificationRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
);
container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImageRepository>(
    'CarsImagesRepository',
    CarsImagesRepository
);
container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokenRepository',
    UsersTokenRepository
);
