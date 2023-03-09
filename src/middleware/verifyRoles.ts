import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401)
    const rolesArray = [...allowedRoles]
    const result = req.roles
      .map(role => rolesArray.includes(role))
      .find(val => val === true);
    if (!result) return res.sendStatus(401);
    next();
    return
  }
}

export default verifyRoles;
