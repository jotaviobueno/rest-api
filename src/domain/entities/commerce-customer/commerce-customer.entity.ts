import { CommerceCustomer } from '@prisma/client';

export class CommerceCustomerEntity implements CommerceCustomer {
  id: string;
  customerId: string;
  commerceId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
