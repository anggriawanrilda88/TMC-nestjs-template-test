import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './database/db.module';
import { ProducerService } from './kafka/producer/producer.service';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { ProductsModule } from './controllers/products/products.module';
import { IsUniqueConstraint } from './shared/is.unique.constrain';
import { KafkaModule } from './kafka/kafka.module';
import { CategoriesModule } from './controllers/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    CategoriesModule,
    ProductsModule,
    KafkaModule
  ],
  controllers: [],
  providers: [
    // kafka service
    ProducerService,
    ConsumerService,
    // custom validation 
    IsUniqueConstraint
  ],
})
export class AppModule { }
