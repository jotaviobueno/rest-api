import {
  ArrayMaxSize,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(1, 1020)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  price: number;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsArray()
  @ArrayMaxSize(3)
  @IsOptional()
  imagesUrls?: string[];

  @IsMongoId()
  @IsNotEmpty()
  commerceId: string;
}
