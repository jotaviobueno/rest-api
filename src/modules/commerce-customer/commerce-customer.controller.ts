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
import { CommerceCustomerService } from './commerce-customer.service';
import {
  CreateCommerceCustomerDto,
  QueryParamsDto,
  UpdateCommerceCustomerDto,
} from 'src/domain/dtos';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';
import { RoleGuard } from '../role/guards';

@Controller('commerce-customer')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.CUSTOMER)
export class CommerceCustomerController {
  constructor(
    private readonly commerceCustomerService: CommerceCustomerService,
  ) {}

  @Post()
  create(@Body() createCommerceCustomerDto: CreateCommerceCustomerDto) {
    return this.commerceCustomerService.create(createCommerceCustomerDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.commerceCustomerService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commerceCustomerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommerceCustomerDto: UpdateCommerceCustomerDto,
  ) {
    return this.commerceCustomerService.update({
      ...updateCommerceCustomerDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commerceCustomerService.remove(id);
  }
}
