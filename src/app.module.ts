import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './database/db.module';
import { ProducerService } from './kafka/producer/producer.service';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { ProductsModule } from './controllers/products/products.module';
import { IsUniqueConstraint } from './shared/is.unique.constrain';
import { KafkaModule } from './kafka/kafka.module';
import { CategoriesModule } from './controllers/categories/categories.module';
import { SearchModule } from './controllers/search/search.module';
import { simpleFunc } from './middleware/simple-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    CategoriesModule,
    ProductsModule,
    SearchModule,
    // KafkaModule
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(simpleFunc).forRoutes('*');
  }
}
