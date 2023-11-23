import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProductSupplierDto {
  @IsMongoId()
  @IsNotEmpty()
  supplierId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}
