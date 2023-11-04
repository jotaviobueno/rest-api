import { Global, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { PersonModule } from '../person/person.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config';
import { AccessGuard } from './guards';

@Global()
@Module({
  imports: [
    PersonModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
  ],
  controllers: [AccessController],
  providers: [AccessService, AccessGuard],
})
export class AccessModule {}
