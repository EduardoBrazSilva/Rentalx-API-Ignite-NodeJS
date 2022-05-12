import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarsUseCase } from './CreateCarsUseCase';

let createCarsUseCase: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarsUseCase = new CreateCarsUseCase(carsRepositoryInMemory);
    });
    it('Should be able to create a new car', async () => {
        const car = await createCarsUseCase.execute({
            name: 'Name Car',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });
        expect(car).toHaveProperty('id');
    });

    it('Should not be able create a car with exists license plate', async () => {
        await createCarsUseCase.execute({
            name: 'car1',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });
        await expect(
            createCarsUseCase.execute({
                name: 'car2',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'Brand',
                category_id: 'category',
            })
        ).rejects.toEqual(new AppError('Car already exists!'));
    });
    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarsUseCase.execute({
            name: 'Car Available',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABCd-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });
        expect(car.available).toBe(true);
    });
});
