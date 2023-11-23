import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSupplierDto } from './create-product-supplier.dto';

export class UpdateProductSupplierDto extends PartialType(
  CreateProductSupplierDto,
) {
  id?: string;
}
