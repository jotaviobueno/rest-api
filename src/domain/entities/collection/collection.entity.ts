import { Collection } from '@prisma/client';

export class CollectionEntity implements Collection {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
