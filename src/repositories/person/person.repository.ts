import { Injectable } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class PersonRepository extends RepositoryFactory<
  PersonEntity,
  CreatePersonDto,
  UpdatePersonDto
> {
  constructor() {
    super('person');
  }

  findById(id: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: any): Promise<PersonEntity[]> {
    return this.prismaService.person.findMany({
      ...query,
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  findByEmail(email: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        email,
      },
    });
  }

  findByUsername(username: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        username,
      },
    });
  }
}
