import { faker } from "@faker-js/faker";
import { Address } from "../address/entities/address.entity";
import { Company } from "../company/entities/company.entity";
import { Founder } from "../founders/entities/founder.entity";
import { Tag } from "../tag/entities/tag.entity";
import { User } from "../user/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        // const tagFactory = factoryManager.get(Tag);
        // const tags = await tagFactory.saveMany(10);

        // const addressFactory = factoryManager.get(Address);
        // const founderFactory = factoryManager.get(Founder);

        const userFactory = factoryManager.get(User);
        await userFactory.saveMany(20);
        
        // const companyFactory = factoryManager.get(Company);
        // const companies = await Promise.all(
        //     Array(50).fill('').map(async () => {
        //         const company = await companyFactory.make({
        //             tags: faker.helpers.arrayElements(tags, faker.number.int({ min: 2, max: 4 })),
        //             addressId: await addressFactory.save(),
        //             founderId: await founderFactory.saveMany(faker.number.int({ min: 2, max: 4 })),
        //         });
        //         return company;
        //     })
        // )

        // const companyRepo = dataSource.getRepository(Company);
        // await companyRepo.save(companies);
    }
}