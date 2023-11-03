import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { environment } from '../../../config/environment';
import { PersonService } from 'src/modules/person/person.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('invalid session', HttpStatus.BAD_REQUEST);

    try {
      const payload: { sub: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: environment.JWT_SECRET,
        },
      );

      request['person'] = await this.personService.findOne(payload.sub);
    } catch (e) {
      console.log(e);

      Logger.debug('FAILED TO AUTH', e.message);

      throw new HttpException('Failed to auth', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
