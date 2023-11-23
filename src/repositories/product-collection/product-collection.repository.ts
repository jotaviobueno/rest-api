import { Injectable } from '@nestjs/common';
import { CreateProductCollectionDto } from 'src/domain/dtos';
import { ProductCollectionEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductCollectionRepository extends RepositoryFactory<
  ProductCollectionEntity,
  CreateProductCollectionDto
> {
  constructor() {
    super('productCollection');
  }
}
