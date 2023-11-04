import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateCommerceDto, UpdateCommerceDto } from 'src/domain/dtos';
import { CommerceEntity } from 'src/domain/entities';

@Injectable()
export class CommerceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateCommerceDto): Promise<CommerceEntity> {
    return this.prismaService.commerce.create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<CommerceEntity> {
    return this.prismaService.commerce.findFirst({
      where: {
        name,
      },
    });
  }

  findAll(): Promise<CommerceEntity[]> {
    return this.prismaService.commerce.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        person: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  count(): Promise<number> {
    return this.prismaService.commerce.count({
      where: {
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<CommerceEntity> {
    return this.prismaService.commerce.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update({ id, ...data }: UpdateCommerceDto): Promise<CommerceEntity> {
    return this.prismaService.commerce.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CommerceEntity> {
    return this.prismaService.commerce.update({
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
