import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/domain/entities';
import { isMongoId } from 'src/domain/utils';
import { RoleRepository } from 'src/repositories/role';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.findAll();
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
