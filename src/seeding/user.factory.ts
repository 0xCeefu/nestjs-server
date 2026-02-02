import { Faker } from "@faker-js/faker";
import { User } from "../user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
    const user = new User();

    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.role = 'user';

    return user;
})