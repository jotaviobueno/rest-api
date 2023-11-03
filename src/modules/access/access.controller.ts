import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from 'src/domain/dtos';
import { PersonEntity } from 'src/domain/entities';
import { AuthGuard } from './guard';
import { UseGuards } from '@nestjs/common';
import { GetPerson } from '../person/decorators';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Get('/who-am-i')
  @UseGuards(AuthGuard)
  whoAmI(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @GetPerson() { password, ...person }: PersonEntity,
  ): Omit<PersonEntity, 'password'> {
    return person;
  }
}
