import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log(token);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
      return
    },
  )
  return
}

export default verifyJWT;
