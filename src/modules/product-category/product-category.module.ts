import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryRepository } from 'src/repositories/product-category';

@Module({
  providers: [ProductCategoryService, ProductCategoryRepository],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
