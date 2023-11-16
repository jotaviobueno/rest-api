import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFindMany } from 'src/domain/@interfaces';
import { ServiceBase } from 'src/domain/base';
import {
  CreateCategoryDto,
  QueryParamsDto,
  UpdateCategoryDto,
} from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { CategoryRepository } from 'src/repositories/category';

@Injectable()
export class CategoryService
  implements ServiceBase<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const nameAlreadyExist = await this.categoryRepository.findByName(dto.name);

    if (nameAlreadyExist)
      throw new HttpException('Name already exist', HttpStatus.BAD_REQUEST);

    const category = await this.categoryRepository.create(dto);

    return category;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<CategoryEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.categoryRepository.findAll(query);
    const total = await this.categoryRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<CategoryEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const category = await this.categoryRepository.findById(id);

    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findOne(dto.id);

    const update = await this.categoryRepository.update({
      ...dto,
      id: category.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async findManyWithIds(ids: string[]): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findManyWithIds(ids);

    categories.forEach((category) => {
      if (!category)
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    });

    return categories;
  }

  async remove(id: string): Promise<boolean> {
    const category = await this.findOne(id);

    const update = await this.categoryRepository.softDelete(category.id);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
