import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
        id,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const newUser = new User();

        Object.assign(newUser, {
            name,
            email,
            password,
            driver_license,
            id,
            avatar,
        });

        this.users.push(newUser);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}

export { UsersRepositoryInMemory };
