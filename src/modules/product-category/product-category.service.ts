import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/base';
import { CreateProductCategoryDto } from 'src/domain/dtos';
import { ProductCategoryEntity } from 'src/domain/entities';
import { ProductCategoryRepository } from 'src/repositories/product-category';

@Injectable()
export class ProductCategoryService
  implements
    Partial<ServiceBase<ProductCategoryEntity, CreateProductCategoryDto>>
{
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  createMany(dto: CreateProductCategoryDto[]): Promise<unknown> {
    return this.productCategoryRepository.createMany(dto);
  }
}
