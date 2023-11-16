import { Injectable } from '@nestjs/common';
import { CreateCommerceDto, UpdateCommerceDto } from 'src/domain/dtos';
import { CommerceEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CommerceRepository extends RepositoryFactory<
  CommerceEntity,
  CreateCommerceDto,
  UpdateCommerceDto
> {
  constructor() {
    super('commerce');
  }

  findByName(name: string): Promise<CommerceEntity> {
    return this.prismaService.commerce.findFirst({
      where: {
        name,
      },
    });
  }

  findAll(query: any): Promise<CommerceEntity[]> {
    return this.prismaService.commerce.findMany({
      ...query,
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

  findById(id: string): Promise<CommerceEntity> {
    return this.prismaService.commerce.findFirst({
      where: {
        id,
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
}
