import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { ProductsService } from '../../services/products.service';
import { FindProductDto } from './dto/find-product.dto';

describe('ProductsController', () => {
  let controller: SearchController;
  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        }
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    const findProductDto = {} as FindProductDto;

    const product = {
      data: [
        {
          "id": "7ae88793-e665-4703-802d-116e75c7e19f",
          "categoryId": "9ccc6765-8073-4f0f-9bff-458c7c2ec739",
          "sku": "p1",
          "name": "Product Name 1",
          "price": 1000000,
          "stock": 100,
          "createdAt": new Date(),
          "category": {
            "id": "9ccc6765-8073-4f0f-9bff-458c7c2ec739",
            "name": "bbddddd",
            "createdAt": new Date()
          }
        } as any
      ],
      total: 1
    };

    jest.spyOn(mockProductsService, 'findAll').mockReturnValue(product);

    const result = await controller.find(findProductDto);

    product.data[0]['createdAt'] = product.data[0]['createdAt'].getTime()
    product.data[0]['category']['createdAt'] = product.data[0]['category']['createdAt'].getTime()
    expect(mockProductsService.findAll).toBeDefined();
    expect(result.data).toEqual(product.data);
  });
});