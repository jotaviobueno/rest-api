import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CreateCommerceDto, UpdateCommerceDto } from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';
import { CurrentPerson } from '../person/decorators';
import { PersonEntity } from 'src/domain/entities';

@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles(ROLE_ENUM.CUSTOMER)
  create(
    @Body() createCommerceDto: CreateCommerceDto,
    @CurrentPerson() person: PersonEntity,
  ) {
    return this.commerceService.create({
      ...createCommerceDto,
      personId: person.id,
    });
  }

  @Get()
  @Roles(ROLE_ENUM.CUSTOMER)
  findAll() {
    return this.commerceService.findAll();
  }

  @Get(':id')
  @Roles(ROLE_ENUM.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.commerceService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE_ENUM.CUSTOMER)
  update(
    @Param('id') id: string,
    @Body() updateCommerceDto: UpdateCommerceDto,
  ) {
    return this.commerceService.update({ ...updateCommerceDto, id });
  }

  @Delete(':id')
  @Roles(ROLE_ENUM.CUSTOMER)
  remove(@Param('id') id: string) {
    return this.commerceService.remove(id);
  }
}
