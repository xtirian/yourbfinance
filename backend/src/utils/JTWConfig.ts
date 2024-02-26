import jwt from 'jsonwebtoken';
import { type UserModel } from '../model/user.model';
import { logger } from '../config';

export const jwtConfig = (data: UserModel): string | undefined => {
  if (data === null) return undefined;
  try {
    if (process.env.PRIVATE_KEY != null) {
      const privateKey = process.env.PRIVATE_KEY;
      const token = jwt.sign(
        {
          id: data.id,
          name: data.name,
          last_name: data.last_name,
          email: data.email
        },
        privateKey,
        {
          expiresIn: '1h'
        }
      );

      if (token != null) {
        return token;
      }
    }
  } catch (error) {
    logger.error('Falha ao gerar token JWT', error);
    return undefined;
  }
};
