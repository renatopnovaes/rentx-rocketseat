import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = {
            name: "Audi A3",
            description:
                "O Audi A3 combina desempenho esportivo com alta eficiência",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Audi",
            category_id: "ae9d5730-3c8c-41aa-8242-14eee83c2510",
        };

        const newCar = await createCarUseCase.execute(car);

        expect(newCar).toHaveProperty("id");
    });

    it("should not be able to create a new car with an existing license plate", async () => {
        expect(async () => {
            // Carro com mesma placa: IFS-1997
            await createCarUseCase.execute({
                name: "Audi A3",
                description:
                    "O Audi A3 combina desempenho esportivo com alta eficiência",
                daily_rate: 140.0,
                license_plate: "IFS-1997",
                fine_amount: 100,
                brand: "Audi",
                category_id: "ae9d5730-3c8c-41aa-8242-14eee83c2510",
            });

            await createCarUseCase.execute({
                name: "Fiat Argo",
                description:
                    "O Fiat Argo é um modelo de carro que se destaca pelo seu desempenho e tecnologia",
                daily_rate: 77.0,
                license_plate: "IFS-1997",
                fine_amount: 0,
                brand: "Fiat",
                category_id: "ae9d5730-3c8c-41aa-8242-14eee83c2510",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with availability by default", async () => {
        const newCar = await createCarUseCase.execute({
            name: "Audi A3",
            description:
                "O Audi A3 combina desempenho esportivo com alta eficiência",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Audi",
            category_id: "ae9d5730-3c8c-41aa-8242-14eee83c2510",
        });

        expect(newCar.available).toBeTruthy();
    });
});
