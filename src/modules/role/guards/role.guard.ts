import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PersonEntity } from 'src/domain/entities';
import { PersonRoleService } from '../../person-role/person-role.service';
import { ROLE_KEY } from '../decorators';
import { RoleService } from '../role.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly personRoleService: PersonRoleService,
    private readonly roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const person: PersonEntity = context.switchToHttp().getRequest()?.person;

    if (!person) return false;

    const personRoles = await this.personRoleService.findManyWithPersonId(
      person.id,
    );

    const rolesIds = personRoles.map((personRole) => personRole.roleId);

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles = await this.roleService.findManyWithIds(rolesIds);

    let hasPermission = false;

    for (const role of roles) {
      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some((requiredRole) => requiredRole === role.name)
      )
        hasPermission = true;
    }

    return hasPermission;
  }
}
