import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleGuard } from './guards';
import { Roles } from './decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @UseGuards(RoleGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
