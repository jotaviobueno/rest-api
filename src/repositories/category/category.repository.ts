import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/domain/dtos';
import { CategoryEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class CategoryRepository extends RepositoryFactory<
  CategoryEntity,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor() {
    super('category');
  }

  findByName(name: string): Promise<CategoryEntity> {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }
}
