import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/base';
import {
  CreateCommerceCustomerDto,
  QueryParamsDto,
  UpdateCommerceCustomerDto,
} from 'src/domain/dtos';
import { CommerceCustomerEntity } from 'src/domain/entities';
import { CustomerService } from '../customer/customer.service';
import { CommerceService } from '../commerce/commerce.service';
import { CommerceCustomerRepository } from 'src/repositories/commerce-customer';
import { IFindMany } from 'src/domain/@interfaces';
import { QueryBuilder, isMongoId } from 'src/domain/utils';

@Injectable()
export class CommerceCustomerService
  implements
    Partial<
      ServiceBase<
        CommerceCustomerEntity,
        CreateCommerceCustomerDto,
        UpdateCommerceCustomerDto
      >
    >
{
  constructor(
    private readonly customerService: CustomerService,
    private readonly commerceService: CommerceService,
    private readonly commerceCustomerRepository: CommerceCustomerRepository,
  ) {}

  async create(
    dto: CreateCommerceCustomerDto,
  ): Promise<CommerceCustomerEntity> {
    const customer = await this.customerService.findOne(dto.customerId);

    const commerce = await this.commerceService.findOne(dto.commerceId);

    const customerAlreadyExistInCommerce =
      await this.commerceCustomerRepository.findByCommerceIdAndCustomerId(dto);

    if (customerAlreadyExistInCommerce)
      throw new HttpException(
        'Customer already exists in this commerce',
        HttpStatus.BAD_REQUEST,
      );

    const commerceCustomer = await this.commerceCustomerRepository.create({
      commerceId: commerce.id,
      customerId: customer.id,
    });

    return commerceCustomer;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CommerceCustomerEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.commerceCustomerRepository.findAll(query);
    const total = await this.commerceCustomerRepository.count();

    return { total, data };
  }

  async findOne(id: string): Promise<CommerceCustomerEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const commerceCustomer = await this.commerceCustomerRepository.findById(id);

    if (!commerceCustomer)
      throw new HttpException(
        'Commerce customer not found',
        HttpStatus.NOT_FOUND,
      );

    return commerceCustomer;
  }

  async update(
    dto: UpdateCommerceCustomerDto,
  ): Promise<CommerceCustomerEntity> {
    const commerceCustomer = await this.findOne(dto.id);

    if (dto.customerId) {
      const customer = await this.customerService.findOne(dto.customerId);

      const customerAlreadyExistInCommerce =
        await this.commerceCustomerRepository.findByCommerceIdAndCustomerId({
          commerceId: commerceCustomer.commerceId,
          customerId: customer.id,
        });

      if (customerAlreadyExistInCommerce)
        throw new HttpException(
          'Customer already exists in this commerce',
          HttpStatus.BAD_REQUEST,
        );
    }

    if (dto.commerceId) {
      const commerce = await this.commerceService.findOne(dto.commerceId);

      const commerceAlreadyExistThisCustomer =
        await this.commerceCustomerRepository.findByCommerceIdAndCustomerId({
          commerceId: commerce.id,
          customerId: commerceCustomer.customerId,
        });

      if (commerceAlreadyExistThisCustomer)
        throw new HttpException(
          'This customer already exist in this commerce',
          HttpStatus.BAD_REQUEST,
        );
    }

    const update = await this.commerceCustomerRepository.update({
      id: commerceCustomer.id,
      ...dto,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const commerceCustomer = await this.findOne(id);

    const remove = await this.commerceCustomerRepository.softDelete(
      commerceCustomer.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
