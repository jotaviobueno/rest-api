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
import { PersonService } from './person.service';
import {
  CreatePersonDto,
  QueryParamsDto,
  UpdatePersonDto,
} from 'src/domain/dtos';
import { IsPublic } from '../access/decorators';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @IsPublic()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.CUSTOMER)
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.personService.findAll(queryParamsDto);
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.CUSTOMER)
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update({ ...updatePersonDto, id });
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.CUSTOMER)
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
