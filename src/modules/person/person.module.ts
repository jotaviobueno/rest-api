import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonRepository } from 'src/repositories/person';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
  exports: [PersonService],
})
export class PersonModule {}
