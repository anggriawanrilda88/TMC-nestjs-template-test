import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { CategoriesController } from './categories.controller';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Categories]),
    TypeOrmModule.forFeature([Categories], 'products_query'),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, ProducerService],
})
export class CategoriesModule { } 
 