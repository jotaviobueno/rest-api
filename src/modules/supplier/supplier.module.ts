import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierRepository } from 'src/repositories/supplier';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
  exports: [SupplierService],
})
export class SupplierModule {}
