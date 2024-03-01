import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/controllers/categories/dto/create-category.dto';
import { Categories } from '../models/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectEntityManager('products_query')
    private entityProductsQueryManager: EntityManager,
  ) { }

  // command service
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Categories(createCategoryDto);
    return await this.entityManager.save(category);
  }

  async createQueryData(categoryDto: any) {
    const category = new Categories(categoryDto);
    return await this.entityProductsQueryManager.save(category);
  }
  // command service

  // query service
  async findOne(id: string) {
    return this.entityProductsQueryManager.findOne(Categories, {where:{id:id}});
  }
  // query service
}
