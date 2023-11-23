import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import {
  CreateSupplierDto,
  QueryParamsDto,
  UpdateSupplierDto,
} from 'src/domain/dtos';
import { SupplierEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/domain/utils';
import { SupplierRepository } from 'src/repositories/supplier';

@Injectable()
export class SupplierService
  implements
    Partial<ServiceBase<SupplierEntity, CreateSupplierDto, UpdateSupplierDto>>
{
  constructor(private readonly supplierRepository: SupplierRepository) {}

  async create(dto: CreateSupplierDto): Promise<SupplierEntity> {
    const cnpjAlreadyExist = await this.supplierRepository.findByCnpj(dto.cnpj);

    if (cnpjAlreadyExist)
      throw new HttpException('Cnpj already exist', HttpStatus.CONFLICT);

    const supplier = await this.supplierRepository.create(dto);

    return supplier;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<SupplierEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.supplierRepository.findAll(query);
    const total = await this.supplierRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<SupplierEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const supplier = await this.supplierRepository.findById(id);

    if (!supplier)
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);

    return supplier;
  }

  async update(dto: UpdateSupplierDto): Promise<SupplierEntity> {
    const supplier = await this.findOne(dto.id);

    const update = await this.supplierRepository.update({
      ...dto,
      id: supplier.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const supplier = await this.findOne(id);

    const remove = await this.supplierRepository.softDelete(supplier.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
