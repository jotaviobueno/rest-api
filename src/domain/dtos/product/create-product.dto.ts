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
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 1500, { each: true })
  @ArrayMaxSize(5)
  descriptions: string[];

  @IsMongoId({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  themesIds?: string[];

  @IsMongoId({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  categoriesIds?: string[];

  @IsMongoId({ each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  collectionsIds?: string[];

  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  type: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  price: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  imagesUrls?: string[];

  @IsMongoId()
  @IsNotEmpty()
  commerceId: string;
}
