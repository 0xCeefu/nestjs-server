import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";
import * as path from "path";

export default ():PostgresConnectionOptions => ({
    type: "postgres",
    url: process.env.DB_URL,
    port: +(process.env.DB_PORT ?? 5432),
    // host: process.env.DB_HOST,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE,
    entities: [path.resolve(__dirname, '..', '**/*/*.entity{.ts,.js}')],
    synchronize: true,
    logging: ['error', 'warn'],
})