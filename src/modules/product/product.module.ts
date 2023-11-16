import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommerceModule } from '../commerce/commerce.module';
import { ProductRepository } from 'src/repositories/product';
import { ThemeModule } from '../theme/theme.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CommerceModule, ThemeModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
