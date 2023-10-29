import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });

    it("should to list all available cars", async () => {
        const cars = await carsRepositoryInMemory.create({
            name: "Carro 1",
            description: "Descrição do carro",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Brand 1",
            category_id: "category_id_1",
        });

        const carsAvailable = await listAvailableCarsUseCase.execute({});

        expect(carsAvailable).toEqual([cars]);
    });

    it("should to list all available cars by brand", async () => {
        const cars = await carsRepositoryInMemory.create({
            name: "Carro 2",
            description: "Descrição do carro",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Brand 2",
            category_id: "category_id_2",
        });

        const carsAvailable = await listAvailableCarsUseCase.execute({
            brand: "Brand 2",
        });

        expect(carsAvailable).toEqual([cars]);
    });

    it("should to list all available cars by category_id", async () => {
        const cars = await carsRepositoryInMemory.create({
            name: "Carro 3",
            description: "Descrição do carro",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Brand 3",
            category_id: "category_id_3",
        });

        const carsAvailable = await listAvailableCarsUseCase.execute({
            category_id: "category_id_3",
        });

        expect(carsAvailable).toEqual([cars]);
    });

    it("should to list all available cars by name", async () => {
        const cars = await carsRepositoryInMemory.create({
            name: "Carro 4",
            description: "Descrição do carro",
            daily_rate: 140.0,
            license_plate: "IFS-1997",
            fine_amount: 100,
            brand: "Brand 4",
            category_id: "category_id_4",
        });

        const carsAvailable = await listAvailableCarsUseCase.execute({
            name: "Carro 4",
        });

        expect(carsAvailable).toEqual([cars]);
    });
});
