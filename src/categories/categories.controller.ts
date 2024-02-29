import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService, private readonly producerService: ProducerService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoriesService.create(createCategoryDto);
    this.producerService.produce({
      topic: 'cho.category.create',
      messages: [{
        value: JSON.stringify({
          id: data.id,
          name: data.name,
          createdAt: data.createdAt,
        })
      }]
    })

    return {
      data: {
        id: data.id,
        name: data.name,
        createdAt: data.createdAt.getTime(),
      }
    };
  }
}
