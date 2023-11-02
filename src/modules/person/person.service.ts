import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { PersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async create(data: CreatePersonDto): Promise<PersonEntity> {
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

    const person = await this.personRepository.create(data);

    return person;
  }

  async findAll(): Promise<IFindMany<PersonEntity>> {
    const data = await this.personRepository.findAll();
    const total = await this.personRepository.count();

    return { total, data };
  }

  async findOne(id: string) {
    const person = await this.personRepository.findById(id);

    if (!person)
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);

    return person;
  }

  async update(data: UpdatePersonDto): Promise<PersonEntity> {
    const person = await this.findOne(data.id);

    const update = await this.personRepository.update({
      ...data,
      id: person.id,
    });

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
