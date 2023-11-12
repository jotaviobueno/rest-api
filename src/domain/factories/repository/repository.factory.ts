import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

export class RepositoryFactory<K, T = void> {
  @Inject(PrismaService)
  public readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create(dto: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...dto,
        deletedAt: null,
      },
    });
  }

  forceFindById(id: string): Promise<K> {
    return this.prismaService[this.model].findFirst({
      where: {
        id,
      },
    });
  }

  findById(id: string): Promise<K> {
    return this.prismaService[this.model].findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<K[]> {
    return this.prismaService[this.model].findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  count(): Promise<number> {
    return this.prismaService[this.model].count();
  }

  findAll(query: any): Promise<K[]> {
    return this.prismaService[this.model].findMany({
      ...query,
      where: {},
    });
  }

  update({ id, ...dto }: Partial<T> & { id?: string }): Promise<K> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<K> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }

  destroy(id: string): Promise<K> {
    return this.prismaService[this.model].delete({
      where: {
        id,
      },
    });
  }
}
