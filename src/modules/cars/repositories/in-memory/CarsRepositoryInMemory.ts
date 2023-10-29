import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../interfaces/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const newCar = new Car();

        Object.assign(newCar, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(newCar);

        return newCar;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> | undefined {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> | undefined {
        const carsAvailable = this.cars.filter((cars) => cars.available);

        if (carsAvailable && (brand || category_id || name)) {
            return carsAvailable.filter(
                (carAvailable) =>
                    (brand && brand === carAvailable.brand) ||
                    (category_id && carAvailable.category_id === category_id) ||
                    (name && carAvailable.name === name),
            );
        }

        return carsAvailable;
    }
}

export { CarsRepositoryInMemory };
