import { Supplier } from '@prisma/client';

export class SupplierEntity implements Supplier {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
