import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import {
  CreateThemeDto,
  QueryParamsDto,
  UpdateThemeDto,
} from 'src/domain/dtos';
import { ThemeEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { ThemeRepository } from 'src/repositories/theme';

@Injectable()
export class ThemeService
  implements ServiceBase<ThemeEntity, CreateThemeDto, UpdateThemeDto>
{
  constructor(private readonly themeRepository: ThemeRepository) {}

  async create(dto: CreateThemeDto): Promise<ThemeEntity> {
    const nameAlreadyExist = await this.themeRepository.findByName(dto.name);

    if (nameAlreadyExist)
      throw new HttpException('Name already exist', HttpStatus.BAD_REQUEST);

    const theme = await this.themeRepository.create(dto);

    return theme;
  }

  async findOne(id: string): Promise<ThemeEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const theme = await this.themeRepository.findById(id);

    if (!theme)
      throw new HttpException('theme not found', HttpStatus.NOT_FOUND);

    return theme;
  }

  async findManyWithIds(ids: string[]): Promise<ThemeEntity[]> {
    const themes = await this.themeRepository.findManyWithIds(ids);

    themes.forEach((theme) => {
      if (!theme)
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
    });

    return themes;
  }

  async findAll(queryParams: QueryParamsDto): Promise<IFindMany<ThemeEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.themeRepository.findAll(query);
    const total = await this.themeRepository.count();

    return { data, total };
  }

  async update(dto: UpdateThemeDto): Promise<ThemeEntity> {
    const theme = await this.findOne(dto.id);

    const update = await this.themeRepository.update({
      ...dto,
      id: theme.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const theme = await this.findOne(id);

    const remove = await this.themeRepository.softDelete(theme.id);

    if (!remove)
      throw new HttpException('remove to update', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
