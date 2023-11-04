import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  name: string;
  description: string | null;
  imagesUrls: string[];
  commerceId: string;
  price: number;
  stock: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
