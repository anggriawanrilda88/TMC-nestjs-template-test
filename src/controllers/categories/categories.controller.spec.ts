import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerService } from '../../kafka/producer/producer.service';
import { CategoriesService } from '../../services/categories.service';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('ProductsController', () => {
  let controller: CategoriesController;
  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
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

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
    const createCategoryDto = {
      name: "Product 1"
    } as CreateCategoryDto;

    const category = {
      "id": "9ccc6765-8073-4f0f-9bff-458c7c2ec739",
      "name": "bbddddd",
      "createdAt": new Date()
    } as any;

    jest.spyOn(mockCategoriesService, 'create').mockReturnValue(category);

    const result = await controller.create(createCategoryDto);

    category['createdAt'] = category['createdAt'].getTime()
    expect(mockCategoriesService.create).toBeDefined();
    expect(result).toEqual({ data: category });
  });
});