import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductRepository extends RepositoryFactory<
  ProductEntity,
  Omit<CreateProductDto, 'themesIds' | 'categoriesIds' | 'collectionsIds'>,
  Omit<UpdateProductDto, 'themesIds' | 'categoriesIds' | 'collectionsIds'>
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
          },
        },
        ProductCategory: {
          select: {
            id: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductCollection: {
          select: {
            id: true,
            collection: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductTheme: {
          select: {
            id: true,
            theme: {
              select: {
                id: true,
                name: true,
              },
            },
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
        isActive: true,
      },
      include: {
        commerce: {
          select: {
            id: true,
            name: true,
          },
        },
        ProductCategory: {
          select: {
            id: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductCollection: {
          select: {
            id: true,
            collection: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        ProductTheme: {
          select: {
            id: true,
            theme: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
