import { PartialType } from '@nestjs/mapped-types';
import { CreateCommerceCustomerDto } from './create-commerce-customer.dto';

export class UpdateCommerceCustomerDto extends PartialType(
  CreateCommerceCustomerDto,
) {
  id?: string;
}
