import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommerceService } from './commerce.service';
import {
  CreateCommerceDto,
  QueryParamsDto,
  UpdateCommerceDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';
import { CurrentPerson } from '../person/decorators';
import { PersonEntity } from 'src/domain/entities';

@Controller('commerce')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.CUSTOMER)
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Post()
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
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.commerceService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commerceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommerceDto: UpdateCommerceDto,
  ) {
    return this.commerceService.update({ ...updateCommerceDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commerceService.remove(id);
  }
}
