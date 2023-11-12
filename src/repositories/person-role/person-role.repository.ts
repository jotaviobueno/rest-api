import { Injectable } from '@nestjs/common';
import { PersonRoleDto } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class PersonRoleRepository extends RepositoryFactory<
  PersonRoleEntity,
  PersonRoleDto
> {
  constructor() {
    super('personRole');
  }

  findByPersonIdAndRoleId({
    personId,
    roleId,
  }: PersonRoleDto): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.findFirst({
      where: {
        personId,
        roleId,
      },
    });
  }

  findManyWithPersonId(personId: string): Promise<PersonRoleEntity[]> {
    return this.prismaService.personRole.findMany({
      where: {
        personId,
      },
    });
  }
}
