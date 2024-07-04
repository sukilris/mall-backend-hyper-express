import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Request } from './entities/request.entity';
import { dbConfig } from 'configuration';

export const db = new DataSource({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: true,
  entities: [Request],
  migrations: [],
  subscribers: [],
});
