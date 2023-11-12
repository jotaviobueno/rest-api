import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import { QueryParamsDto } from 'src/domain/dtos';
import { RoleEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { RoleRepository } from 'src/repositories/role';

@Injectable()
export class RoleService implements Partial<ServiceBase<RoleEntity>> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(queryParams: QueryParamsDto): Promise<IFindMany<RoleEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.roleRepository.findAll(query);
    const total = await this.roleRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<RoleEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const role = await this.roleRepository.findById(id);

    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    return role;
  }

  findByName(name: string): Promise<RoleEntity> {
    return this.roleRepository.findByName(name);
  }

  findManyWithIds(ids: string[]): Promise<RoleEntity[]> {
    return this.roleRepository.findManyWithIds(ids);
  }
}
