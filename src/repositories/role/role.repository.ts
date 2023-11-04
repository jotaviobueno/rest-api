import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { RoleEntity } from 'src/domain/entities';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany({
      where: {},
    });
  }

  findById(id: string): Promise<RoleEntity> {
    return this.prismaService.role.findFirst({
      where: {
        id,
      },
    });
  }

  findByName(name: string): Promise<RoleEntity> {
    return this.prismaService.role.findFirst({
      where: {
        name,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
