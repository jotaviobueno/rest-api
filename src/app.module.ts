import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './modules/access/guard';

@Module({
  imports: [PersonModule, PrismaModule, AccessModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
