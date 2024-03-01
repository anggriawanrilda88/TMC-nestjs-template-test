import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Products } from '../models/products.entity';

describe('ProductsService', () => {
    let service: ProductsService;
    let productsRepository: Repository<Products>;
    let productsEntityManager: EntityManager;
    let productsEntityQueryManager: EntityManager;

    const queryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        // Other methods you may need
        getMany: jest.fn().mockReturnValue([]),
    };

    const productsRepositoryMock = {
        createQueryBuilder: jest.fn(() => queryBuilderMock),
        // Other methods and properties
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Products, 'products_query'),
                    useValue: {
                        findOneBy: jest.fn(),
                        findAll: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Products),
                    useValue: productsRepositoryMock,
                },
                {
                    provide: getEntityManagerToken('products_query'),
                    useValue: {
                        save: jest.fn(),
                        findOneBy: jest.fn(),
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

        service = module.get<ProductsService>(ProductsService);
        productsRepository = module.get<Repository<Products>>(getRepositoryToken(Products));
        productsEntityManager = module.get<EntityManager>(EntityManager);
        productsEntityQueryManager = module.get<EntityManager>(getEntityManagerToken('products_query'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create', async () => {
        await service.create({ name: "Product 1", price: 10000, sku: "p1" });
        expect(productsEntityManager.save).toHaveBeenCalled();
    });

    test('createQueryData', async () => {
        await service.createQueryData({ name: "Product 1", price: 10000, sku: "p1" });
        expect(productsEntityQueryManager.save).toHaveBeenCalled();
    });

    test('findOneBy', async () => {
        await service.findOneBy({ sku: "p1" });
        expect(productsEntityQueryManager.findOneBy).toHaveBeenCalled();
    });
});