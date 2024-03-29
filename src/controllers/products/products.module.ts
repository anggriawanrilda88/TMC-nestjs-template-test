import { Module } from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../models/products.entity';
import { ProductsController } from './products.controller';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CategoriesService } from 'src/services/categories.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Products], 'products_query'),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    CategoriesService, 
    ProducerService],
})
export class ProductsModule { } 
 