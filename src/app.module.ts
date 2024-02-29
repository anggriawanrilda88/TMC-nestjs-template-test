import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './database/db.module';
import { ProducerService } from './kafka/producer/producer.service';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { ProductsModule } from './products/products.module';
import { IsUniqueConstraint } from './shared/is.unique.constrain';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    CategoriesModule,
    ProductsModule,
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
