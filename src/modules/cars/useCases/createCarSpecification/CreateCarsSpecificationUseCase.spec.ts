import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarsSpecificationUseCase } from './CreateCarsSpecificationUseCase';

let createCarsSpecificationUseCase: CreateCarsSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarsSpecificationUseCase = new CreateCarsSpecificationUseCase(
            carsRepositoryInMemory
        );
    });
    it('Shoulb not be able to add a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ['54321'];

            await createCarsSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Shoulb be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });

        const specifications_id = ['54321'];

        await createCarsSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
    });
});
