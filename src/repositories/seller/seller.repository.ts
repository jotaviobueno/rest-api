import { Injectable } from '@nestjs/common';
import { CreateSellerDto, UpdateSellerDto } from 'src/domain/dtos';
import { SelllerEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';

@Injectable()
export class SellerRepository extends RepositoryFactory<
  SelllerEntity,
  CreateSellerDto,
  UpdateSellerDto
> {
  constructor() {
    super('seller');
  }

  findById(id: string): Promise<SelllerEntity> {
    return this.prismaService.seller.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null,
      },
      include: {
        commerce: {
          select: {
            name: true,
            id: true,
            imagesUrls: true,
          },
        },
      },
    });
  }
}
