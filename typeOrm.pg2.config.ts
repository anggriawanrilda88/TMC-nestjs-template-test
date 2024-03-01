import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Categories } from './src/models/categories.entity';
import { DataSource } from 'typeorm';
import { Products } from './src/models/products.entity';

config();

const configService = new ConfigService();

// this is connection for query database
export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('PG2_HOST'),
  port: configService.getOrThrow('PG2_PORT'),
  database: configService.getOrThrow('PG2_DATABASE'),
  username: configService.getOrThrow('PG2_USERNAME'),
  password: configService.getOrThrow('PG2_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [Categories, Products],
});
