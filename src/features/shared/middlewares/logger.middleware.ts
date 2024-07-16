import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }

  try {
    const decodedToken = jwt.verify(cookies.Authorization, secret);
    cookies.push(decodedToken);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default authMiddleware;
