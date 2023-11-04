import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize?: number;

  constructor() {
    if (!this.page) this.page = 1;
    if (!this.pageSize) this.pageSize = 200;
  }
}
