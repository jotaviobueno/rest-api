import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import {
  CreateCustomerDto,
  QueryParamsDto,
  UpdateCustomerDto,
} from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { CommerceService } from '../commerce/commerce.service';
import { CustomerRepository } from 'src/repositories/customer';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class CustomerService
  implements
    Partial<ServiceBase<CustomerEntity, CreateCustomerDto, UpdateCustomerDto>>
{
  constructor(
    private readonly commerceService: CommerceService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(dto: CreateCustomerDto): Promise<CustomerEntity> {
    const emailAlreadyExist = await this.customerRepository.forceFindByEmail(
      dto.email,
    );

    if (emailAlreadyExist)
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);

    const usernameAlreadyExist =
      await this.customerRepository.forceFindByUsername(dto.email);

    if (usernameAlreadyExist)
      throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);

    const customer = await this.customerRepository.create(dto);

    return customer;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CustomerEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.customerRepository.findAll(query);
    const total = await this.customerRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<CustomerEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const customer = await this.customerRepository.findById(id);

    if (!customer)
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

    return customer;
  }

  async update(dto: UpdateCustomerDto): Promise<CustomerEntity> {
    const customer = await this.findOne(dto.id);

    if (dto.email) {
      const emailAlreadyExist = await this.customerRepository.forceFindByEmail(
        dto.email,
      );

      if (emailAlreadyExist)
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    if (dto.username) {
      const usernameAlreadyExist =
        await this.customerRepository.forceFindByUsername(dto.email);

      if (usernameAlreadyExist)
        throw new HttpException(
          'Username already exist',
          HttpStatus.BAD_REQUEST,
        );
    }

    const update = await this.customerRepository.update({
      ...dto,
      id: customer.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const customer = await this.findOne(id);

    const remove = await this.customerRepository.softDelete(customer.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
