import { Module } from '@nestjs/common';
import { CommerceCustomerService } from './commerce-customer.service';
import { CommerceCustomerController } from './commerce-customer.controller';
import { CommerceModule } from '../commerce/commerce.module';
import { CustomerModule } from '../customer/customer.module';
import { CommerceCustomerRepository } from 'src/repositories/commerce-customer';

@Module({
  imports: [CommerceModule, CustomerModule],
  controllers: [CommerceCustomerController],
  providers: [CommerceCustomerService, CommerceCustomerRepository],
  exports: [CommerceCustomerService],
})
export class CommerceCustomerModule {}
