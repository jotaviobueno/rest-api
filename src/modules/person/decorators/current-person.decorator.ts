import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentPerson = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.person;
  },
);
