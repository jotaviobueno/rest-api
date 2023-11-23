import { Module } from '@nestjs/common';
import { ProductSupplierService } from './product-supplier.service';
import { ProductSupplierController } from './product-supplier.controller';
import { ProductModule } from '../product/product.module';
import { SupplierModule } from '../supplier/supplier.module';
import { ProductSupplierRepository } from 'src/repositories/product-supplier';

@Module({
  imports: [ProductModule, SupplierModule],
  controllers: [ProductSupplierController],
  providers: [ProductSupplierService, ProductSupplierRepository],
  exports: [ProductSupplierService],
})
export class ProductSupplierModule {}
