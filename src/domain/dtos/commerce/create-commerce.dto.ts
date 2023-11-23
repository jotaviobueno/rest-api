import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCommerceDto {
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMaxSize(3)
  @Length(1, 1020, { each: true })
  @IsOptional()
  description?: string[];

  @IsArray()
  @ArrayMaxSize(3)
  @IsOptional()
  imagesUrls: string[];

  personId: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
