import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateSellerDto {
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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsNotEmpty()
  avatarUrl: string;
}
