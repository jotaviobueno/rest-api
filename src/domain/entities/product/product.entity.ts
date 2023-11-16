import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string[];
  themesIds: string[];
  categoriesIds: string[];
  type: string;
  price: number;
  stock: number | null;
  imagesUrls: string[];
  commerceId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
