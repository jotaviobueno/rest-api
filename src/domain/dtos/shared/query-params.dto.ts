import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number = 200;

  // TODO: Deixa salvo
  // constructor() {
  //   if (!this.page) this.page = 1;
  //   if (!this.pageSize) this.pageSize = 200;
  // }
}
