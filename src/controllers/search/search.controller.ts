import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductsService } from 'src/services/products.service';
import { generateMetaPage } from '../utils';

@Controller('api/search')
export class SearchController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @Get()
  async create(@Query() query: FindProductDto) {
    const data = await this.productsService.findAll(
      query.page,
      query.perPage,
      query.sku,
      query.name,
      {
        start: query['price.start'],
        end: query['price.end']
      },
      {
        start: query['stock.start'],
        end: query['stock.end']
      },
      query['category.id'],
      query['category.name'],
    )
    return {
      data: data.data,
      paging: generateMetaPage(query.page, query.perPage, data.total)
    }
  }


}
