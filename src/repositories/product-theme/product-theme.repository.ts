import { Injectable } from '@nestjs/common';
import { CreateProductThemeDto } from 'src/domain/dtos';
import { ProductThemeEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductThemeRepository extends RepositoryFactory<
  ProductThemeEntity,
  CreateProductThemeDto
> {
  constructor() {
    super('productTheme');
  }
}
