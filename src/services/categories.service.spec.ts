import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Categories } from '../models/categories.entity';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
    let service: CategoriesService;
    let categoriesEntityManager: EntityManager;
    let categoriesEntityQueryManager: EntityManager;

    const queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        // Other methods you may need
        getMany: jest.fn().mockReturnValue([]),
    };

    const categoriesRepositoryMock = {
        createQueryBuilder: jest.fn(() => queryBuilderMock),
        // Other methods and properties
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {
                    provide: getEntityManagerToken('products_query'),
                    useValue: {
                        save: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: EntityManager,
                    useValue: {
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
        categoriesEntityManager = module.get<EntityManager>(EntityManager);
        categoriesEntityQueryManager = module.get<EntityManager>(getEntityManagerToken('products_query'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create', async () => {
        await service.create({ name: "Makanan" });
        expect(categoriesEntityManager.save).toHaveBeenCalled();
    });

    test('createQueryData', async () => {
        await service.createQueryData({ name: "Product 1" });
        expect(categoriesEntityQueryManager.save).toHaveBeenCalled();
    });

    test('findOne', async () => {
        await service.findOne("uuid-uuid");
        expect(categoriesEntityQueryManager.findOne).toHaveBeenCalled();
    });
});