import { Faker } from "@faker-js/faker";
import { Company } from "../company/entities/company.entity";
import { setSeederFactory } from "typeorm-extension";

export const CompanyFactory = setSeederFactory(Company, (faker: Faker) => {
    const company = new Company();
    company.name = faker.company.name();
    company.industry = faker.commerce.department();
    company.country = faker.location.country();
    company.isSeekingFunding = faker.datatype.boolean();

    return company;
})