import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonRepository } from 'src/repositories/person';
import { PersonRoleModule } from '../person-role/person-role.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PersonRoleModule, RoleModule],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
  exports: [PersonService],
})
export class PersonModule {}
