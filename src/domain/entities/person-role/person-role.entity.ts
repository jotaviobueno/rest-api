import { PersonRole } from '@prisma/client';

export class PersonRoleEntity implements PersonRole {
  id: string;
  personId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
