import { type NextFunction, type Request, type Response, Router } from 'express';
import { logger } from '../config';
import { jwtVerify } from '../utils/JTWConfig';

export const authMiddleware = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
authMiddleware.use(async (req: Request, res: Response, next: NextFunction) => {
  const originalURL = req.originalUrl;

  if (originalURL === '/user/login' || originalURL === '/user/signup') {
    next();
    return;
  }

  const { token } = req.headers;
  try {
    const verifyToken = await jwtVerify(token as string);

    if (!verifyToken) throw new Error('Token inválido');

    logger.info('Time: ', Date.now());
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
});
