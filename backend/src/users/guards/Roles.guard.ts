import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/utils/constans';
import { JWTPAYLOADType } from 'src/utils/types';
import { UsersService } from '../users.service';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/utils/enum';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly config: ConfigService,
    private readonly userservice: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles: UserType[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return false;

    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (token && type === 'Bearer') {
      try {
        const payload: JWTPAYLOADType = await this.jwtservice.verifyAsync(
          token,
          {
            secret: this.config.get<string>('JWT_SECRET'),
          },
        );
        const user = await this.userservice.getCurrentuser(payload.id);
        if (!user) return false;

        if (roles.includes(user.userType)) {
          request[CURRENT_USER_KEY] = payload;
          return true;
        }
      } catch (err) {
        console.log(err);
        throw new UnauthorizedException('');
      }
    } else {
      throw new UnauthorizedException('');
    }
    return true;
  }
}
