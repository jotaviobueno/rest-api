import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/base';
import { CreateProductCollectionDto } from 'src/domain/dtos';
import { ProductCollectionEntity } from 'src/domain/entities';
import { ProductCollectionRepository } from 'src/repositories/product-collection';

@Injectable()
export class ProductCollectionService
  implements
    Partial<ServiceBase<ProductCollectionEntity, CreateProductCollectionDto>>
{
  constructor(
    private readonly productCollectionRepository: ProductCollectionRepository,
  ) {}

  createMany(dto: CreateProductCollectionDto[]): Promise<unknown> {
    return this.productCollectionRepository.createMany(dto);
  }
}
