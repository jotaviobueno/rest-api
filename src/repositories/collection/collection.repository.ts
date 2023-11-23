import { Injectable } from '@nestjs/common';
import { CreateCollectionDto, UpdateCollectionDto } from 'src/domain/dtos';
import { CollectionEntity } from 'src/domain/entities/collection';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CollectionRepository extends RepositoryFactory<
  CollectionEntity,
  CreateCollectionDto,
  UpdateCollectionDto
> {
  constructor() {
    super('collection');
  }

  findByName(name: string): Promise<CollectionEntity> {
    return this.prismaService.collection.findFirst({
      where: {
        name,
      },
    });
  }
}
