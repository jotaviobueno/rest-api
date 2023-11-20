import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
