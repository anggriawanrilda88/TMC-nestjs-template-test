import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { EntityManager } from 'typeorm';
import { Products } from './entities/products.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
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
  // query service
}
