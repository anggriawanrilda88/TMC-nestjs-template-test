import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CategoriesService } from 'src/services/categories.service';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly producerService: ProducerService
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productsService.create(createProductDto);
    this.producerService.produce({
      topic: 'cho.product.create',
      messages: [{
        value: JSON.stringify({
          id: data.id,
          name: data.name,
          sku: data.sku,
          price: data.price,
          stock: data.stock,
          categoryId: data.categoryId,
          createdAt: data.createdAt,
        })
      }]
    })

    const category = await this.categoriesService.findOne(data.categoryId);

    return {
      data: {
        id: data.id,
        name: data.name,
        sku: data.sku,
        price: data.price,
        stock: data.stock,
        category: {
          id: category.id,
          name: category.name,
        },
        createdAt: data.createdAt.getTime(),
      }
    };
  }
}
