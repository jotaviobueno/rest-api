import { IFindMany } from 'src/domain/@interfaces';
import { QueryParamsDto } from 'src/domain/dtos';

export abstract class ServiceBase<K, T = void> {
  abstract create(dto: T): Promise<K>;
  abstract findOne(id: string): Promise<K>;
  abstract findManyWithIds(ids: string[]): Promise<K[]>;
  abstract findAll(queryParams: QueryParamsDto): Promise<IFindMany<K>>;
  abstract update(dto: T & { id?: string }): Promise<K>;
  abstract remove(id: string): Promise<boolean>;
}
