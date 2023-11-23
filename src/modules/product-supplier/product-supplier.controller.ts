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
import { ProductSupplierService } from './product-supplier.service';
import {
  CreateProductSupplierDto,
  QueryParamsDto,
  UpdateProductSupplierDto,
} from 'src/domain/dtos';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ROLE_ENUM } from 'src/domain/enum/role';

@Controller('product-supplier')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.CUSTOMER)
export class ProductSupplierController {
  constructor(
    private readonly productSupplierService: ProductSupplierService,
  ) {}

  @Post()
  create(@Body() createProductSupplierDto: CreateProductSupplierDto) {
    return this.productSupplierService.create(createProductSupplierDto);
  }

  @Get()
  findAll(@Query() queryParamsDto: QueryParamsDto) {
    return this.productSupplierService.findAll(queryParamsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSupplierService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductSupplierDto: UpdateProductSupplierDto,
  ) {
    return this.productSupplierService.update({
      ...updateProductSupplierDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSupplierService.remove(id);
  }
}
