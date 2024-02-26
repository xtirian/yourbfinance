import jwt from 'jsonwebtoken';
import { type UserModel } from '../model/user.model';

export const jwtConfig = (data: Promise<UserModel | null>): string | undefined => {
  if (data === null) return undefined;
  if (process.env.PRIVATE_KEY != null) {
    const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
    const token: string | undefined = jwt.sign(data, privateKey, { algorithm: 'RS256' });

    return token;
  }
};
