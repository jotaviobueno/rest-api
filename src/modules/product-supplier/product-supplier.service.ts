import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/base';
import {
  CreateProductSupplierDto,
  QueryParamsDto,
  UpdateProductSupplierDto,
} from 'src/domain/dtos';
import { ProductSupplierEntity } from 'src/domain/entities';
import { ProductService } from '../product/product.service';
import { SupplierService } from '../supplier/supplier.service';
import { ProductSupplierRepository } from 'src/repositories/product-supplier';
import { QueryBuilder, isMongoId } from 'src/domain/utils';
import { IFindMany } from 'src/domain/@interfaces';

@Injectable()
export class ProductSupplierService
  implements
    Partial<
      ServiceBase<
        ProductSupplierEntity,
        CreateProductSupplierDto,
        UpdateProductSupplierDto
      >
    >
{
  constructor(
    private readonly productService: ProductService,
    private readonly supplierService: SupplierService,
    private readonly productSupplierRepository: ProductSupplierRepository,
  ) {}

  async create(dto: CreateProductSupplierDto): Promise<ProductSupplierEntity> {
    const supplier = await this.supplierService.findOne(dto.supplierId);

    const product = await this.productService.findOne(dto.productId);

    const supplierAlreadyThisProduct =
      await this.productSupplierRepository.findByProductIdAndSupplierId({
        productId: product.id,
        supplierId: supplier.id,
      });

    if (supplierAlreadyThisProduct)
      throw new HttpException(
        'Supplier already exist in this product',
        HttpStatus.BAD_REQUEST,
      );

    const productSupplier = await this.productSupplierRepository.create(dto);

    return productSupplier;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<IFindMany<ProductSupplierEntity>> {
    const query = new QueryBuilder(queryParams).handle();

    const data = await this.productSupplierRepository.findAll(query);
    const total = await this.productSupplierRepository.count();

    return { data, total };
  }

  async findOne(id: string): Promise<ProductSupplierEntity> {
    if (!isMongoId(id))
      throw new HttpException(
        'Id sent its not mongo id',
        HttpStatus.BAD_REQUEST,
      );

    const productSupplier = await this.productSupplierRepository.findById(id);

    if (!productSupplier)
      throw new HttpException(
        'productSupplier not found',
        HttpStatus.NOT_FOUND,
      );

    return productSupplier;
  }

  async update(dto: UpdateProductSupplierDto): Promise<ProductSupplierEntity> {
    const productSupplier = await this.findOne(dto.id);

    if (dto.productId) {
      const product = await this.productService.findOne(dto.productId);

      const productAlreadyExist =
        await this.productSupplierRepository.findByProductIdAndSupplierId({
          productId: product.id,
          supplierId: productSupplier.id,
        });

      if (productAlreadyExist)
        throw new HttpException(
          'Product already exist in this supplier',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.supplierId) {
      const supplier = await this.supplierService.findOne(dto.supplierId);

      const supplierAlreadyExist =
        await this.productSupplierRepository.findByProductIdAndSupplierId({
          productId: supplier.id,
          supplierId: dto.id,
        });

      if (supplierAlreadyExist)
        throw new HttpException(
          'Supplier already exist in this product',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.productSupplierRepository.update({
      ...dto,
      id: productSupplier.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const productSupplier = await this.findOne(id);

    const remove = await this.productSupplierRepository.softDelete(
      productSupplier.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
