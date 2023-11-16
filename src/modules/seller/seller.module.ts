import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { CommerceModule } from '../commerce/commerce.module';
import { SellerRepository } from 'src/repositories/seller';

@Module({
  imports: [CommerceModule],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
  exports: [SellerService],
})
export class SellerModule {}
