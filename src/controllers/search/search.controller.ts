import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductsService } from '../../services/products.service';
import { generateMetaPage } from '../utils';

@Controller('api/search')
export class SearchController {
  constructor(
    private readonly productsService: ProductsService,
  ) { }

  @Get()
  async find(@Query() query: FindProductDto) {
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

    const newData = data.data.map(val => {
      return {
        ...val,
        createdAt: val.createdAt.getTime(),
        category: {
          ...val.category,
          createdAt: val.category.createdAt.getTime()
        }
      }
    });

    return {
      data: newData,
      paging: generateMetaPage(query.page, query.perPage, data.total)
    }
  }


}
