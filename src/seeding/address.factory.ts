import { Faker } from "@faker-js/faker";
import { Address } from "../data/entities/address.entity";
import { setSeederFactory } from "typeorm-extension";

export const AddressFactory = setSeederFactory(Address, (faker: Faker) => {
    const address = new Address();

    address.street = faker.location.streetAddress();
    address.city = faker.location.city();
    address.state = faker.location.state();
     
    return address;
})