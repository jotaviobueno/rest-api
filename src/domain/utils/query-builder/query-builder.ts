import { QueryParamsDto } from 'src/domain/dtos';

export class QueryBuilder {
  private query: any;

  constructor(private readonly queryParams: QueryParamsDto) {
    this.query = {
      where: {},
      skip:
        (parseInt(this.queryParams.page.toString()) - 1) *
        parseInt(this.queryParams.pageSize.toString()),
      take: Number(this.queryParams.pageSize),
      orderBy: [],
    };
  }

  handle() {
    return this.query;
  }
}
