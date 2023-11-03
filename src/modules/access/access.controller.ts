import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { CurrentPerson } from '../person/decorators';
import { IsPublic } from './decorators';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  @IsPublic()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get('/who-am-i')
  whoAmI(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentPerson() { password, ...person }: PersonEntity,
  ): Omit<PersonEntity, 'password'> {
    return person;
  }
}
