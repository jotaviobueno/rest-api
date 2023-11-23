import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/base';
import { CreateProductThemeDto } from 'src/domain/dtos';
import { ProductThemeEntity } from 'src/domain/entities';
import { ProductThemeRepository } from 'src/repositories/product-theme';

@Injectable()
export class ProductThemeService
  implements Partial<ServiceBase<ProductThemeEntity, CreateProductThemeDto>>
{
  constructor(
    private readonly productThemeRepository: ProductThemeRepository,
  ) {}

  createMany(dto: CreateProductThemeDto[]): Promise<unknown> {
    return this.productThemeRepository.createMany(dto);
  }
}
