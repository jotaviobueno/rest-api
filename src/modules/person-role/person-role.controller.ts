import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { PersonRoleService } from './person-role.service';
import { PersonRoleDto } from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('person-role')
export class PersonRoleController {
  constructor(private readonly personRoleService: PersonRoleService) {}

  @Post()
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @UseGuards(RoleGuard)
  create(@Body() personRoleDto: PersonRoleDto) {
    return this.personRoleService.assign(personRoleDto);
  }

  @Delete()
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  remove(@Body() personRoleDto: PersonRoleDto) {
    return this.personRoleService.unlink(personRoleDto);
  }
}
