import { Module } from '@nestjs/common';
import { ProductCollectionService } from './product-collection.service';
import { ProductCollectionRepository } from 'src/repositories/product-collection';

@Module({
  providers: [ProductCollectionService, ProductCollectionRepository],
  exports: [ProductCollectionService],
})
export class ProductCollectionModule {}
