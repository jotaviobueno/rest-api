import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './modules/access/guards';
import { RoleModule } from './modules/role/role.module';
import { PersonRoleModule } from './modules/person-role/person-role.module';
import { CommerceModule } from './modules/commerce/commerce.module';
import { ProductModule } from './modules/product/product.module';
import { SellerModule } from './modules/seller/seller.module';
import { CategoryModule } from './modules/category/category.module';
import { ThemeModule } from './modules/theme/theme.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CommerceCustomerModule } from './modules/commerce-customer/commerce-customer.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductSupplierModule } from './modules/product-supplier/product-supplier.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductCollectionModule } from './modules/product-collection/product-collection.module';
import { ProductThemeModule } from './modules/product-theme/product-theme.module';

@Module({
  imports: [
    PersonModule,
    PrismaModule,
    AccessModule,
    RoleModule,
    PersonRoleModule,
    CommerceModule,
    ProductModule,
    SellerModule,
    CategoryModule,
    ThemeModule,
    CustomerModule,
    CommerceCustomerModule,
    SupplierModule,
    ProductSupplierModule,
    CollectionModule,
    ProductCategoryModule,
    ProductCollectionModule,
    ProductThemeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
