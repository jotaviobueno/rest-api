import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from '../../domain/dtos/theme/create-theme.dto';
import { UpdateThemeDto } from '../../domain/dtos/theme/update-theme.dto';
import { QueryParamsDto } from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('theme')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.CUSTOMER)
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themeService.create(createThemeDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.themeService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themeService.update({ ...updateThemeDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.themeService.remove(id);
  }
}
