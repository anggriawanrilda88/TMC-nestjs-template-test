import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Categories } from './src/models/categories.entity';
import { DataSource } from 'typeorm';
import { Products } from './src/models/products.entity';

config();

const configService = new ConfigService();

// this is connection for command database
export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('PG1_HOST'),
  port: configService.getOrThrow('PG1_PORT'),
  database: configService.getOrThrow('PG1_DATABASE'),
  username: configService.getOrThrow('PG1_USERNAME'),
  password: configService.getOrThrow('PG1_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [Categories, Products],
});
