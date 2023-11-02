import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto, IdInput, UpdatePersonDto } from 'src/domain/dtos';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') { id }: IdInput,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update({ ...updatePersonDto, id });
  }

  @Delete(':id')
  remove(@Param('id') { id }: IdInput) {
    return this.personService.remove(id);
  }
}
