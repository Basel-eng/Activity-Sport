import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CURRENT_USER_KEY } from 'src/utils/constans';
import { JWTPAYLOADType } from 'src/utils/types';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const payload: JWTPAYLOADType = request[CURRENT_USER_KEY];
    return payload;
  },
);
