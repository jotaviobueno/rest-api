import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/domain/dtos';
import { CustomerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CustomerRepository extends RepositoryFactory<
  CustomerEntity,
  CreateCustomerDto,
  UpdateCustomerDto
> {
  constructor() {
    super('customer');
  }

  forceFindByEmail(email: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        email,
      },
    });
  }

  forceFindByUsername(username: string): Promise<CustomerEntity> {
    return this.prismaService.customer.findFirst({
      where: {
        username,
      },
    });
  }
}
