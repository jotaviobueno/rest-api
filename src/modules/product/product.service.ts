import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/dtos/product/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/product/update-product.dto';
import { ProductRepository } from 'src/repositories/product/product.repository';
import { CommerceService } from '../commerce/commerce.service';
import { IFindMany } from 'src/domain/@interfaces';
import { ProductEntity } from 'src/domain/entities';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { QueryParamsDto } from 'src/domain/dtos';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly commerceService: CommerceService,
  ) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const commerce = await this.commerceService.findOne(data.commerceId);

    const product = await this.productRepository.create({
      ...data,
      commerceId: commerce.id,
    });

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
