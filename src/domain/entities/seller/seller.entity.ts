import { Seller } from '@prisma/client';

export class SelllerEntity implements Seller {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  commerceId: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
