import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { AddressFactory } from "./address.factory";
import { CompanyFactory } from "./company.factory";
import { FounderFactory } from "./founder.factory";
import { TagFactory } from "./tag.factory";
import { MainSeeder } from "./main.seeder";
import dbConfig from "../config/db.config";    

const options: DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories: [AddressFactory, CompanyFactory, FounderFactory, TagFactory],
    seeds: [MainSeeder]
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async() => {
    await dataSource.synchronize();
    await runSeeders(dataSource);
    process.exit(0);
}).catch(error => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
});