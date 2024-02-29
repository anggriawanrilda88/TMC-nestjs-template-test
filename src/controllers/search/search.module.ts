import { Module } from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../../models/products.entity';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CategoriesService } from 'src/services/categories.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    TypeOrmModule.forFeature([Products], 'products_query'),
  ],
  controllers: [SearchController],
  providers: [
    ProductsService,
    CategoriesService,
  ],
})
export class SearchModule { }
