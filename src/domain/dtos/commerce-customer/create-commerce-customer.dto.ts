import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCommerceCustomerDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsMongoId()
  @IsNotEmpty()
  commerceId: string;
}
