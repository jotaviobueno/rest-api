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
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly personService: PersonService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    try {
      const payload: { sub: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: environment.JWT_SECRET,
        },
      );

      request['person'] = await this.personService.findOne(payload.sub, true);
    } catch (e) {
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
