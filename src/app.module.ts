import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma.module';
import { AccessModule } from './modules/access/access.module';

@Module({
  imports: [PersonModule, PrismaModule, AccessModule],
})
export class AppModule {}
