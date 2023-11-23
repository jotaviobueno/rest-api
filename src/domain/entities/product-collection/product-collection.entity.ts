import { ProductCollection } from '@prisma/client';

export class ProductCollectionEntity implements ProductCollection {
  id: string;
  productId: string;
  collectionId: string;
}
