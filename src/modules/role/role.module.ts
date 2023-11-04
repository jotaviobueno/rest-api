import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from 'src/repositories/role';
import { RoleGuard } from './guards';
import { PersonRoleModule } from '../person-role/person-role.module';

@Module({
  imports: [forwardRef(() => PersonRoleModule)],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, RoleGuard],
  exports: [RoleService, RoleGuard],
})
export class RoleModule {}
