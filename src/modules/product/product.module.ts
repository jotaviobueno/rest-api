import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommerceModule } from '../commerce/commerce.module';
import { ProductRepository } from 'src/repositories/product';
import { CollectionModule } from '../collection/collection.module';
import { CategoryModule } from '../category/category.module';
import { ThemeModule } from '../theme/theme.module';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductCollectionModule } from '../product-collection/product-collection.module';
import { ProductThemeModule } from '../product-theme/product-theme.module';

@Module({
  imports: [
    CommerceModule,
    CollectionModule,
    CategoryModule,
    ThemeModule,
    ProductCategoryModule,
    ProductCollectionModule,
    ProductThemeModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
