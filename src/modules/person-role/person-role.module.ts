import { Global, Module, forwardRef } from '@nestjs/common';
import { PersonRoleService } from './person-role.service';
import { PersonRoleController } from './person-role.controller';
import { PersonRoleRepository } from 'src/repositories/person-role';
import { RoleModule } from '../role/role.module';
import { PersonModule } from '../person/person.module';

@Global()
@Module({
  imports: [RoleModule, forwardRef(() => PersonModule)],
  controllers: [PersonRoleController],
  providers: [PersonRoleService, PersonRoleRepository],
  exports: [PersonRoleService],
})
export class PersonRoleModule {}
