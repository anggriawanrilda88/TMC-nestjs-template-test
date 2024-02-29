import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../controllers/products/dto/create-product.dto';
import { EntityManager, Repository } from 'typeorm';
import { Products } from '../models/products.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { getOffsetRows } from './utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products, 'products_query')
    private readonly productsRepository: Repository<Products>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectEntityManager('products_query')
    private entityProductsQueryManager: EntityManager,
  ) { }

  // command database
  async create(createProductDto: CreateProductDto) {
    const product = new Products(createProductDto);
    return await this.entityManager.save(product);
  }

  async createQueryData(productDto: any) {
    const product = new Products(productDto);
    return await this.entityProductsQueryManager.save(product);
  }
  // command database

  // query service
  async findOneBy(where: { sku: string }) {
    return this.entityProductsQueryManager.findOneBy(Products, where);
  }

  async findAll(
    page?: number,
    perPage?: number,
    sku?: string[],
    name?: string[],
    price?: {
      start?: number,
      end?: number,
    },
    stock?: {
      start?: number,
      end?: number,
    },
    categoryId?: string[],
    categoryName?: string[],
  ): Promise<{ data: any, total: number }> {
    const queryBuilder = this.productsRepository.createQueryBuilder('products');
    queryBuilder.leftJoinAndSelect('products.category', 'categories');

    if (sku) {
      const data = Array.isArray(sku) ? sku : [sku];
      queryBuilder.where(`products.sku in(:...sku)`, { sku: data });
    }

    if (name) {
      if (Array.isArray(name)) {
        const nameConditions = name.map((v, index) => {
          const parameterName = `name_${index}`;
          queryBuilder.setParameter(parameterName, `%${v}%`);
          return `products.name ILIKE :${parameterName}`;
        });

        queryBuilder.andWhere(`(${nameConditions.join(' OR ')})`);
      } else {
        queryBuilder.orWhere(`products.name ILIKE :name `, { name: `%${name}%` });
      }
    }

    if (price.start) {
      queryBuilder.andWhere(`products.price >= :startDate and products.price <= :endDate`, { startDate: price.start, endDate: price.end });
    }

    if (stock.start) {
      queryBuilder.andWhere(`products.stock >= :startStock and products.stock <= :endStock`, { startStock: stock.start, endStock: stock.end });
    }

    if (categoryId) {
      const data = Array.isArray(categoryId) ? categoryId : [categoryId];
      queryBuilder.where(`products.category_id in(:...categoryId)`, { categoryId: data });
    }

    if (categoryName) {
      const data = Array.isArray(categoryName) ? categoryName : [categoryName];
      queryBuilder.where(`categories.name in(:...categoryName)`, { categoryName: data });
    }

    // get count for pagination
    const count = queryBuilder.getCount();

    const skip = getOffsetRows(page, perPage);
    if (skip) {
      queryBuilder.offset(Number(skip));
    }

    if (perPage) {
      queryBuilder.limit(perPage);
    }

    return {
      data: await queryBuilder.getMany(),
      total: await count
    };
  }
}
