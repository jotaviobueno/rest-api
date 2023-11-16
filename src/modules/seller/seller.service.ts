import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSellerDto,
  QueryParamsDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import { SellerRepository } from 'src/repositories/seller';
import { CommerceService } from '../commerce/commerce.service';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { ServiceBase } from 'src/domain/base';
import { SelllerEntity } from 'src/domain/entities';
import { IFindMany } from 'src/domain/@interfaces';

@Injectable()
export class SellerService
  implements
    Partial<ServiceBase<SelllerEntity, CreateSellerDto, UpdateSellerDto>>
{
  constructor(
    private readonly sellerRepository: SellerRepository,
    private readonly commerceService: CommerceService,
  ) {}

  async create(data: CreateSellerDto): Promise<SelllerEntity> {
    const commerce = await this.commerceService.findOne(data.commerceId);

    const seller = await this.sellerRepository.create({
      ...data,
      commerceId: commerce.id,
    });

    return seller;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<SelllerEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.sellerRepository.findAll(query);
    const total = await this.sellerRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<SelllerEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const seller = await this.sellerRepository.findById(id);

    if (!seller)
      throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async update(data: UpdateSellerDto): Promise<SelllerEntity> {
    const seller = await this.findOne(data.id);

    const update = await this.sellerRepository.update({
      ...data,
      id: seller.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const seller = await this.findOne(id);

    const remove = await this.sellerRepository.softDelete(seller.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
