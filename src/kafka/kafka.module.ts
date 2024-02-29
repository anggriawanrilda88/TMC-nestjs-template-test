import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { CreateCategoryConsumer } from './consumer/create.category.consume';
import { CategoriesService } from 'src/services/categories.service';
import { ProductsService } from 'src/services/products.service';
import { ConfigModule } from '@nestjs/config';
import { Products } from 'src/models/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),
        TypeOrmModule.forFeature([Products], 'products_query'),
    ],
    providers: [
        ProducerService, ConsumerService,
        // db service
        CategoriesService,
        ProductsService,
        // consumer service
        CreateCategoryConsumer
    ],
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule { }