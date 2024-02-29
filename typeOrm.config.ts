import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Categories } from 'src/models/categories.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('PG1_HOST'),
  port: configService.getOrThrow('PG1_PORT'),
  database: configService.getOrThrow('PG1_DATABASE'),
  username: configService.getOrThrow('PG1_USERNAME'),
  password: configService.getOrThrow('PG1_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [Categories],
});
