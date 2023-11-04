import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { PersonRoleDto } from 'src/domain/dtos';
import { PersonRoleEntity } from 'src/domain/entities';

@Injectable()
export class PersonRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: PersonRoleDto): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.create({
      data,
    });
  }

  findById(id: string): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.findFirst({
      where: {
        id,
      },
    });
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

  destroy(id: string): Promise<PersonRoleEntity> {
    return this.prismaService.personRole.delete({
      where: {
        id,
      },
    });
  }
}
