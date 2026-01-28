import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { AddressFactory } from "./address.factory";
import { CompanyFactory } from "./company.factory";
import { FounderFactory } from "./founder.factory";
import { TagFactory } from "./tag.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    // host: 'db.bmadzqvwsftartxourtn.supabase.co',
    // port: 5432,
    // username: 'postgres',
    // password: '1H7W0kbgS6BZeP0c',
    // database: 'postgres',
    url: 'postgresql://neondb_owner:npg_t3WNXGzguE4l@ep-shiny-water-ah6r52pe-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    entities: [__dirname + '/../data/entities/*.entity{.ts,.js}'],
    synchronize: true,
    logging: ['error', 'warn'],
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