import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/product/update-product.dto';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { CommerceService } from '../commerce/commerce.service';
import { IFindMany } from 'src/domain/@interfaces';
import { ProductEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { QueryParamsDto } from 'src/domain/dtos';
import { ServiceBase } from 'src/domain/base';
import { CategoryService } from '../category/category.service';
import { CollectionService } from '../collection/collection.service';
import { ThemeService } from '../theme/theme.service';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductCollectionService } from '../product-collection/product-collection.service';
import { ProductThemeService } from '../product-theme/product-theme.service';

@Injectable()
export class ProductService
  implements
    Partial<ServiceBase<ProductEntity, CreateProductDto, UpdateProductDto>>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly commerceService: CommerceService,
    private readonly categoryService: CategoryService,
    private readonly collectionService: CollectionService,
    private readonly themeService: ThemeService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productCollectionService: ProductCollectionService,
    private readonly productThemeService: ProductThemeService,
  ) {}

  async create({
    categoriesIds,
    themesIds,
    collectionsIds,
    ...data
  }: CreateProductDto): Promise<ProductEntity> {
    const commerce = await this.commerceService.findOne(data.commerceId);

    if (categoriesIds)
      await this.categoryService.findManyWithIds(categoriesIds);

    if (collectionsIds)
      await this.collectionService.findManyWithIds(collectionsIds);

    if (themesIds) await this.themeService.findManyWithIds(themesIds);

    const product = await this.productRepository.create({
      ...data,
      commerceId: commerce.id,
    });

    if (categoriesIds) {
      const createProductCategoryDto = categoriesIds.map((categoryId) => ({
        categoryId,
        productId: product.id,
      }));

      await this.productCategoryService.createMany(createProductCategoryDto);
    }

    if (collectionsIds) {
      const createProductCollectionDto = collectionsIds.map((collectionId) => ({
        collectionId,
        productId: product.id,
      }));

      await this.productCollectionService.createMany(
        createProductCollectionDto,
      );
    }

    if (themesIds) {
      const createProductThemeDto = themesIds.map((themeId) => ({
        themeId,
        productId: product.id,
      }));

      await this.productThemeService.createMany(createProductThemeDto);
    }

    return product;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<ProductEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.productRepository.findAll(query);
    const total = await this.productRepository.count();

    return { data, total };
  }

  async findOne(id: string) {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const product = await this.productRepository.findById(id);

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async update(data: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(data.id);

    if (data.categoriesIds)
      await this.categoryService.findManyWithIds(data.categoriesIds);

    if (data.collectionsIds)
      await this.collectionService.findManyWithIds(data.collectionsIds);

    if (data.themesIds) await this.themeService.findManyWithIds(data.themesIds);

    const update = await this.productRepository.update({
      ...data,
      id: product.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findOne(id);

    const remove = await this.productRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
