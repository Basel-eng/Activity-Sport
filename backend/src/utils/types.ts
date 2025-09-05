import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: JWTPAYLOADType;
}

export type JWTPAYLOADType = {
  id: number;
  userType: string;
};

export type AccessTokenType = {
  accessToken: string;
};
