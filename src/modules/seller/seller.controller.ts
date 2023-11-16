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
import { SellerService } from './seller.service';
import {
  CreateSellerDto,
  QueryParamsDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('seller')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.CUSTOMER)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.sellerService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update({ ...updateSellerDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
