import { Theme } from '@prisma/client';

export class ThemeEntity implements Theme {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
