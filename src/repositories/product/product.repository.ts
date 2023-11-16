import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductRepository extends RepositoryFactory<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super('product');
  }

  findById(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        commerce: {
          select: {
            id: true,
            name: true,
            imagesUrls: true,
          },
        },
      },
    });
  }

  findAll(query: any): Promise<ProductEntity[]> {
    return this.prismaService.product.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        commerce: {
          select: {
            name: true,
            imagesUrls: true,
            id: true,
          },
        },
      },
    });
  }
}
