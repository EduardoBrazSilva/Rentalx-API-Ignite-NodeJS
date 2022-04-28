import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });
    it('Shoulb be able to list all avaliable cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 1',
            description: 'Car description',
            daily_rate: 140.0,
            license_plate: 'DEF-1212',
            fine_amount: 100,
            brand: 'Car_brand',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('Shoulb be able to list all avaliable cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car 2',
            description: 'Car description',
            daily_rate: 140.0,
            license_plate: 'DEF-1212',
            fine_amount: 100,
            brand: 'Car_brand_TEST',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_brand_TEST',
        });

        expect(cars).toEqual([car]);
    });

    it('Shoulb be able to list all avaliable cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'Car description',
            daily_rate: 140.0,
            license_plate: 'DEF-121f2',
            fine_amount: 100,
            brand: 'Car_name_TEST',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car3',
        });

        expect(cars).toEqual([car]);
    });

    it('Shoulb be able to list all avaliable cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car4',
            description: 'Car description',
            daily_rate: 140.0,
            license_plate: 'DEF-121f82',
            fine_amount: 100,
            brand: 'Car_category_id_TEST',
            category_id: '12345',
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: '12345',
        });

        expect(cars).toEqual([car]);
    });
});
