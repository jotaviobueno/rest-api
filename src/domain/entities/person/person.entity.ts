import { Person } from '@prisma/client';

export class PersonEntity implements Person {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
