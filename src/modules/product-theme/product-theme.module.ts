import { Module } from '@nestjs/common';
import { ProductThemeService } from './product-theme.service';
import { ProductThemeRepository } from 'src/repositories/product-theme';

@Module({
  providers: [ProductThemeService, ProductThemeRepository],
  exports: [ProductThemeService],
})
export class ProductThemeModule {}
