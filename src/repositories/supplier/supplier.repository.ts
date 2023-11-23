import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from 'src/domain/dtos';
import { SupplierEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class SupplierRepository extends RepositoryFactory<
  SupplierEntity,
  CreateSupplierDto,
  UpdateSupplierDto
> {
  constructor() {
    super('supplier');
  }

  findByCnpj(cnpj: string): Promise<SupplierEntity> {
    return this.prismaService.supplier.findFirst({
      where: {
        cnpj,
      },
    });
  }
}
