import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { CreateCommerceDto, UpdateCommerceDto } from 'src/domain/dtos';
import { CommerceEntity } from 'src/domain/entities';
import { isMongoId } from 'src/domain/utils';
import { CommerceRepository } from 'src/repositories/commerce';

@Injectable()
export class CommerceService {
  constructor(private readonly commerceRepository: CommerceRepository) {}

  async create(data: CreateCommerceDto): Promise<CommerceEntity> {
    const nameAlreadyExist = await this.commerceRepository.findByName(
      data.name,
    );

    if (nameAlreadyExist)
      throw new HttpException('Name Alread exist', HttpStatus.BAD_REQUEST);

    const commerce = await this.commerceRepository.create(data);

    return commerce;
  }

  async findAll(): Promise<IFindMany<CommerceEntity>> {
    const data = await this.commerceRepository.findAll();
    const total = await this.commerceRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<CommerceEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const commerce = await this.commerceRepository.findById(id);

    if (!commerce)
      throw new HttpException('Commerce not found', HttpStatus.NOT_FOUND);

    return commerce;
  }

  async update(data: UpdateCommerceDto): Promise<CommerceEntity> {
    const commerce = await this.findOne(data.id);

    const update = await this.commerceRepository.update({
      ...data,
      id: commerce.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const commerce = await this.findOne(id);

    const remove = await this.commerceRepository.softDelete(commerce.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
