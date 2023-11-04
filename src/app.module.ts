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

@Module({
  imports: [
    PersonModule,
    PrismaModule,
    AccessModule,
    RoleModule,
    PersonRoleModule,
    CommerceModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
