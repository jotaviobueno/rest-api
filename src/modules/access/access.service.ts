import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessDto } from '../../domain/dtos/access/create-access.dto';
import { PersonService } from '../person/person.service';
import { compare } from 'src/domain/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  constructor(
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAccessDto: CreateAccessDto) {
    const person = await this.personService.findByEmail(createAccessDto.email);

    const passwordIsEqual = await compare(
      createAccessDto.password,
      person.password,
    );

    if (!passwordIsEqual)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign({
      sub: person.id,
    });

    return { token };
  }
}
