import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
    teste?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository") private carsRepository: ICarsRepository,
    ) {}

    async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const allCarsAvailable = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name,
        );

        return allCarsAvailable;
    }
}

export { ListAvailableCarsUseCase };
