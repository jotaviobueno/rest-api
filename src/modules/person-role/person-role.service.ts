import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { PersonRoleDto } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';
import { PersonRoleRepository } from 'src/repositories/person-role';
import { PersonService } from '../person/person.service';
import { RoleService } from '../role/role.service';
import { ServiceBase } from 'src/domain/base';

@Injectable()
export class PersonRoleService
  implements Partial<ServiceBase<PersonRoleDto, PersonRoleEntity>>
{
  constructor(
    private readonly personRoleRepository: PersonRoleRepository,
    @Inject(forwardRef(() => PersonService))
    private readonly personService: PersonService,
    private readonly roleService: RoleService,
  ) {}

  create(data: PersonRoleDto): Promise<PersonRoleEntity> {
    return this.personRoleRepository.create(data);
  }

  async assign(data: PersonRoleDto): Promise<PersonRoleEntity> {
    const person = await this.personService.findOne(data.personId);

    const role = await this.roleService.findOne(data.roleId);

    const personAlreadyThisRole =
      await this.personRoleRepository.findByPersonIdAndRoleId({
        personId: person.id,
        roleId: role.id,
      });

    if (personAlreadyThisRole)
      throw new HttpException(
        'This person already this role',
        HttpStatus.CONFLICT,
      );

    const personRole = await this.personRoleRepository.create(data);

    return personRole;
  }

  async findOne(id: string): Promise<PersonRoleEntity> {
    const personRole = await this.personRoleRepository.findById(id);

    if (!personRole)
      throw new HttpException('Person role not found', HttpStatus.NOT_FOUND);

    return personRole;
  }

  findManyWithPersonId(personId: string): Promise<PersonRoleEntity[]> {
    return this.personRoleRepository.findManyWithPersonId(personId);
  }

  async unlink(data: PersonRoleDto): Promise<PersonRoleEntity> {
    const person = await this.personService.findOne(data.personId);

    const role = await this.roleService.findOne(data.roleId);

    const personAlreadyThisRole =
      await this.personRoleRepository.findByPersonIdAndRoleId({
        personId: person.id,
        roleId: role.id,
      });

    if (!personAlreadyThisRole)
      throw new HttpException(
        'This person not have this role',
        HttpStatus.BAD_REQUEST,
      );

    const personRole = await this.personRoleRepository.destroy(
      personAlreadyThisRole.id,
    );

    return personRole;
  }
}
