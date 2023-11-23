import { ProductSupplier } from '@prisma/client';

export class ProductSupplierEntity implements ProductSupplier {
  id: string;
  productId: string;
  supplierId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
