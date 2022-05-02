import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsSpecificationUseCase } from './CreateCarsSpecificationUseCase';

class CreateCarsSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;
        const createCarsSpecificationUseCase = container.resolve(
            CreateCarsSpecificationUseCase
        );

        const cars = await createCarsSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });
        return response.json(cars);
    }
}

export { CreateCarsSpecificationsController };
