import { Commerce } from '@prisma/client';

export class CommerceEntity implements Commerce {
  id: string;
  name: string;
  descriptions: string[];
  imagesUrls: string[];
  personId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isActive: boolean;
}
