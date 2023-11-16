import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(3, 1500)
  description?: string;
}
