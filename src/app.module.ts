import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma.module';

@Module({
  imports: [PersonModule, PrismaModule],
})
export class AppModule {}
