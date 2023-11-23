import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsCnpj } from 'src/domain/validators';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsCnpj()
  @IsNotEmpty()
  cnpj: string;
}
