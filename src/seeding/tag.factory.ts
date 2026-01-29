import { Faker } from "@faker-js/faker";
import { Tag } from "../tag/entities/tag.entity";
import { setSeederFactory } from "typeorm-extension";

export const TagFactory = setSeederFactory(Tag, (faker: Faker) => {
    const tag = new Tag();
    tag.name = faker.lorem.word();
    return tag;
})