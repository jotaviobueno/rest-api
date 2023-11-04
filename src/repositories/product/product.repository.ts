import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity } from 'src/domain/entities';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateProductDto): Promise<ProductEntity> {
    return this.prismaService.product.create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<ProductEntity> {
    return this.prismaService.product.findFirst({
      where: {
        id,
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

  count(): Promise<number> {
    return this.prismaService.product.count({
      where: {
        deletedAt: null,
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

  update({ id, ...data }: UpdateProductDto): Promise<ProductEntity> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<ProductEntity> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
