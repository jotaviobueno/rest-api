import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreatePersonDto, UpdatePersonDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';

@Injectable()
export class PersonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreatePersonDto): Promise<PersonEntity> {
    return this.prismaService.person.create({
      data: {
        ...data,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<PersonEntity> {
    return this.prismaService.person.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  count(): Promise<number> {
    return this.prismaService.person.count({
      where: {
        deletedAt: null,
      },
    });
  }

  findAll(query: any): Promise<Omit<PersonEntity, 'password'>[]> {
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

  update({ id, ...data }: UpdatePersonDto): Promise<PersonEntity> {
    return this.prismaService.person.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<PersonEntity> {
    return this.prismaService.person.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
