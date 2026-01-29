import { Faker } from "@faker-js/faker";
import { Founder } from "../founders/entities/founder.entity";
import { setSeederFactory } from "typeorm-extension";

export const FounderFactory = setSeederFactory(Founder, (faker: Faker) => {
    const founder = new Founder();
    founder.name = faker.person.fullName();
    founder.role = faker.person.jobTitle();
    return founder;
})