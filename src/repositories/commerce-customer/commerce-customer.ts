import { Injectable } from '@nestjs/common';
import {
  CreateCommerceCustomerDto,
  UpdateCommerceCustomerDto,
} from 'src/domain/dtos';
import { CommerceCustomerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CommerceCustomerRepository extends RepositoryFactory<
  CommerceCustomerEntity,
  CreateCommerceCustomerDto,
  UpdateCommerceCustomerDto
> {
  constructor() {
    super('commerceCustomer');
  }

  findByCommerceIdAndCustomerId(
    dto: CreateCommerceCustomerDto,
  ): Promise<CommerceCustomerEntity> {
    return this.prismaService.commerceCustomer.findFirst({
      where: {
        ...dto,
      },
    });
  }

  findById(id: string): Promise<CommerceCustomerEntity> {
    return this.prismaService.commerceCustomer.findFirst({
      where: {
        id,
      },
      include: {
        commerce: {
          select: {
            name: true,
            id: true,
            imagesUrls: true,
          },
        },
        customer: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  findAll(query: any): Promise<CommerceCustomerEntity[]> {
    return this.prismaService.commerceCustomer.findMany({
      ...query,
      where: {},
      include: {
        commerce: {
          select: {
            name: true,
            id: true,
            imagesUrls: true,
          },
        },
        customer: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
