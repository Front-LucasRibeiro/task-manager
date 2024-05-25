import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + "/migrations/*.{js,ts}"],
  synchronize: false,
});
