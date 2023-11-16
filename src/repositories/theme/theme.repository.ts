import { Injectable } from '@nestjs/common';
import { CreateThemeDto, UpdateThemeDto } from 'src/domain/dtos';
import { ThemeEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class ThemeRepository extends RepositoryFactory<
  ThemeEntity,
  CreateThemeDto,
  UpdateThemeDto
> {
  constructor() {
    super('theme');
  }

  findByName(name: string): Promise<ThemeEntity> {
    return this.prismaService.theme.findFirst({
      where: {
        name,
      },
    });
  }
}
