import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logError } from '../logger';

interface IPayload {
  id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.API_KEY) {
      return res.status(401).json('Acess denied');
    }

    const token = req.query.API_KEY;
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || 'tokentest'
    ) as IPayload;
    req.userId = payload.id;

    next();
  } catch (e) {
    logError(`${e}`);
    return res.status(401).json('Token invalid');
  }
};
