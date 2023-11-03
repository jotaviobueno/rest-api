import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { IsPublic } from '../access/decorators';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @IsPublic()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
