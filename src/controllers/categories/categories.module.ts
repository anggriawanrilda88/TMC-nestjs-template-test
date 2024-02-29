import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CategoriesService } from 'src/services/categories.service';
import { Categories } from 'src/models/categories.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Categories]),
    TypeOrmModule.forFeature([Categories], 'products_query'),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, ProducerService],
})
export class CategoriesModule { } 
 