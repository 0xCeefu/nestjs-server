import { Faker } from "@faker-js/faker";
import { User } from "../user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";
import { Role } from "src/auth/enums/role.enum";

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();

    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.role = Role.USER;

    return user;
})