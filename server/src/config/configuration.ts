import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";


import { config as dotenvConfig } from 'dotenv';
  // export default registerAs('database', () => ({
  //   type: 'postgres',
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   entities: ["dist/**/*.entity{.ts,.js}"],
  //   migrations: [process.env.TYPEORM_MIGRATIONS],
  //   autoLoadEntities: true,
  //   synchronize: process.env.TYPEORM_SYNHRONIZE === 'true',
    
  // }));

  dotenvConfig({ path: '.env' });


  const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    autoLoadEntities: true,
    synchronize: process.env.TYPEORM_SYNHRONIZE === 'true',
}


  export default registerAs('database', () => config)
  export const connectionSource = new DataSource(config as DataSourceOptions);