import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from '../../kafka/producer/producer.service';
import { CategoriesService } from '../../services/categories.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
        {
          provide: ProducerService,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    const createProductDto = {
      name: "Product 1",
      price: 10000,
      sku: "P1"
    } as CreateProductDto;

    const product = {
      "id": "14683f85-32b7-4520-800c-8bd214848cea",
      "name": "Product Name 3",
      "sku": "p3",
      "price": 20000,
      "stock": 10,
      "category": {
        "id": "9ccc6765-8073-4f0f-9bff-458c7c2ec739",
        "name": "bbddddd"
      },
      "createdAt": new Date()
    } as any;

    const category = {
      "id": "9ccc6765-8073-4f0f-9bff-458c7c2ec739",
      "name": "bbddddd",
      "createdAt": new Date()
    } as any;

    jest.spyOn(mockProductService, 'create').mockReturnValue(product);
    jest.spyOn(mockCategoriesService, 'findOne').mockReturnValue(category);

    const result = await controller.create(createProductDto);

    product['createdAt'] = product['createdAt'].getTime()
    expect(mockProductService.create).toBeDefined();
    expect(result).toEqual({ data: product });
  });
});