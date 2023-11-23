import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import {
  CreateCollectionDto,
  QueryParamsDto,
  UpdateCollectionDto,
} from 'src/domain/dtos';
import { CollectionEntity } from 'src/domain/entities/collection';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { CollectionRepository } from '../../repositories/collection/collection.repository';

@Injectable()
export class CollectionService
  implements
    Partial<
      ServiceBase<CollectionEntity, CreateCollectionDto, UpdateCollectionDto>
    >
{
  constructor(private readonly collectionRepository: CollectionRepository) {}

  async create(dto: CreateCollectionDto): Promise<CollectionEntity> {
    const nameAlreadyExist = await this.collectionRepository.findByName(
      dto.name,
    );

    if (nameAlreadyExist)
      throw new HttpException('name already exist', HttpStatus.BAD_REQUEST);

    const collection = await this.collectionRepository.create(dto);

    return collection;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CollectionEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.collectionRepository.findAll(query);
    const total = await this.collectionRepository.count();

    return { data, total };
  }

  async findManyWithIds(ids: string[]): Promise<CollectionEntity[]> {
    const collectionIds = ids.map((id) => {
      if (!isMongoId(id))
        throw new HttpException(
          'Id sent its not mongo id',
          HttpStatus.BAD_REQUEST,
        );

      return id;
    });

    const collections =
      await this.collectionRepository.findManyWithIds(collectionIds);

    collections.forEach((collection) => {
      if (!collection)
        throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
    });

    return collections;
  }

  async findOne(id: string): Promise<CollectionEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const collection = await this.collectionRepository.findById(id);

    if (!collection)
      throw new HttpException('collection not found', HttpStatus.NOT_FOUND);

    return collection;
  }

  async update(dto: UpdateCollectionDto): Promise<CollectionEntity> {
    const collection = await this.findOne(dto.id);

    if (dto.name) {
      const nameAlreadyExist = await this.collectionRepository.findByName(
        dto.name,
      );

      if (nameAlreadyExist)
        throw new HttpException('name already exist', HttpStatus.BAD_REQUEST);
    }

    const update = await this.collectionRepository.update({
      ...dto,
      id: collection.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const collection = await this.findOne(id);

    const remove = await this.collectionRepository.softDelete(collection.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
