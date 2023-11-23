import { ProductTheme } from '@prisma/client';

export class ProductThemeEntity implements ProductTheme {
  id: string;
  productId: string;
  themeId: string;
}
