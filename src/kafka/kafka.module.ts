import { Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConsumerService } from './consumer/consumer.service';
import { ProductsService } from 'src/products/products.service';
import { CreateCategoryConsumer } from './consumer/create.category.consume';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
    providers: [ProducerService, ConsumerService,
        // db service
        CategoriesService,
        ProductsService,
        // consumer service
        CreateCategoryConsumer
    ],
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule { }