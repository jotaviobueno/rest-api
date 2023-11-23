import { ProductCategory } from '@prisma/client';

export class ProductCategoryEntity implements ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
}
