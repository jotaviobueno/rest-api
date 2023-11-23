import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}
