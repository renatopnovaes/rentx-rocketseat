import { Repository, getRepository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "@modules/cars/repositories/interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const newSpecification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(newSpecification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({ name });
    }

    async list(): Promise<Specification[]> {
        return this.repository.find();
    }
}

export { SpecificationsRepository };
