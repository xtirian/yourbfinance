import jwt from 'jsonwebtoken';
import { type UserModel } from '../model/user.model';
import { logger } from '../config';
import { UserRepository } from '../repository/user.respository';

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

export const jwtVerify = async (token: string): Promise<boolean> => {
  if (process.env.PRIVATE_KEY != null) {
    const privateKey = process.env.PRIVATE_KEY;
    try {
      const decoded = jwt.verify(token, privateKey);

      const data = decoded as UserModel;

      const getUser = await new UserRepository().findUnique({ where: { email: data.email } });

      if (getUser === null) return false;

      return true;
    } catch (error) {
      logger.error('Falha ao verificar token JWT', error);
      return false;
    }
  }
  return false;
};
