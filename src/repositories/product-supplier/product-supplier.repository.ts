import { Injectable } from '@nestjs/common';
import {
  CreateProductSupplierDto,
  UpdateProductSupplierDto,
} from 'src/domain/dtos';
import { ProductSupplierEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ProductSupplierRepository extends RepositoryFactory<
  ProductSupplierEntity,
  CreateProductSupplierDto,
  UpdateProductSupplierDto
> {
  constructor() {
    super('productSupplier');
  }

  findByProductIdAndSupplierId(
    dto: CreateProductSupplierDto,
  ): Promise<ProductSupplierEntity> {
    return this.prismaService.productSupplier.findFirst({
      where: {
        ...dto,
        deletedAt: null,
      },
    });
  }

  findAll(query: any): Promise<ProductSupplierEntity[]> {
    return this.prismaService.productSupplier.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      include: {
        product: {
          select: {
            name: true,
            id: true,
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findById(id: string): Promise<ProductSupplierEntity> {
    return this.prismaService.productSupplier.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        product: {
          select: {
            name: true,
            id: true,
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
