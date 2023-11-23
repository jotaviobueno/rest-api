import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductCategoryRepository extends RepositoryFactory<
  ProductCategoryEntity,
  CreateProductCategoryDto
> {
  constructor() {
    super('productCategory');
  }
}
