import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsUseCase } from './CreateCarsUseCase';

class CreateCarsController {
    async handle(request: Request, respose: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        } = request.body;

        const createCarsUseCase = container.resolve(CreateCarsUseCase);
        const car = await createCarsUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return respose.status(201).json(car);
    }
}

export { CreateCarsController };
