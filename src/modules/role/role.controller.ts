import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleGuard } from './guards';
import { Roles } from './decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';
import { QueryParamsDto } from 'src/domain/dtos';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
  @UseGuards(RoleGuard)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.roleService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
