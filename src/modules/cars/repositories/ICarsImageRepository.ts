import { CarImages } from '../infra/typeorm/entities/CarImages';

interface ICarsImageRepository {
    create(car_id: string, image_name: string): Promise<CarImages>;
}

export { ICarsImageRepository };
