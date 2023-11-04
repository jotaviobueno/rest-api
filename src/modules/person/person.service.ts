import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { PersonRepository } from 'src/repositories/person';
import { hash, isMongoId } from 'src/domain/utils';
import { RoleService } from '../role/role.service';
import { PersonRoleService } from '../person-role/person-role.service';

@Injectable()
export class PersonService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => PersonRoleService))
    private readonly personRoleService: PersonRoleService,
  ) {}

  async create(data: CreatePersonDto): Promise<Omit<PersonEntity, 'password'>> {
    const emailAlreadyExist = await this.personRepository.findByEmail(
      data.email,
    );

    if (emailAlreadyExist)
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);

    const usernameAlreadyExist = await this.personRepository.findByUsername(
      data.email,
    );

    if (usernameAlreadyExist)
      throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);

    const passwordHash = await hash(data.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...person } = await this.personRepository.create({
      ...data,
      password: passwordHash,
    });

    const role = await this.roleService.findByName('USER');

    await this.personRoleService.create({
      personId: person.id,
      roleId: role.id,
    });

    return person;
  }

  async findByEmail(email: string): Promise<PersonEntity> {
    const person = await this.personRepository.findByEmail(email);

    if (!person)
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);

    return person;
  }

  async findAll(): Promise<IFindMany<Omit<PersonEntity, 'password'>>> {
    const data = await this.personRepository.findAll();
    const total = await this.personRepository.count();

    return { total, data };
  }

  async findOne(
    id: string,
    returnPassword: boolean = false,
  ): Promise<Omit<PersonEntity, 'password'> | PersonEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const { password, ...person } = await this.personRepository.findById(id);

    if (!person)
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);

    return returnPassword ? person : { ...person, password };
  }

  async update(data: UpdatePersonDto): Promise<Omit<PersonEntity, 'password'>> {
    const person = await this.findOne(data.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...update } = await this.personRepository.update({
      ...data,
      id: person.id,
    });

    if (data.password) data.password = await hash(data.password);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const person = await this.findOne(id);

    const remove = await this.personRepository.softDelete(person.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
