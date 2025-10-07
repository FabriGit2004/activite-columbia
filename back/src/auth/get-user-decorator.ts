import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuarios } from '../users/entities/Usuarios';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Usuarios => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // esto lo setea el AuthGuard
  },
);
