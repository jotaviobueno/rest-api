import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  lastName: string;

  @IsMongoId()
  @IsNotEmpty()
  commerceId: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsNotEmpty()
  avatarUrl: string;
}
