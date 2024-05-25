import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'fr0nt3nd2019',
  database: 'task_manager',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: false,
});
