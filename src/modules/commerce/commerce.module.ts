import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { CommerceRepository } from 'src/repositories/commerce';
import { PersonRoleModule } from '../person-role/person-role.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PersonRoleModule, RoleModule],
  controllers: [CommerceController],
  providers: [CommerceService, CommerceRepository],
})
export class CommerceModule {}
