import { PartialType } from '@nestjs/mapped-types';
import { CreateCommerceDto } from './create-commerce.dto';

export class UpdateCommerceDto extends PartialType(CreateCommerceDto) {
  id?: string;
}
