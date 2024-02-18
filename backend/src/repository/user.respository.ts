import { type Prisma } from '@prisma/client';
import { prisma } from '../config/index';
import { type UserModel } from '../model/user.model';

const UserRepository = {
  findMany: async (params: Prisma.UserFindManyArgs): Promise<UserModel[]> => {
    return await prisma.user.findMany({ ...params });
  },

  findUnique: async (params: Prisma.UserFindUniqueArgs): Promise<UserModel | null> => {
    return await prisma.user.findUnique({ ...params });
  },

  create: async (params: Prisma.UserCreateArgs): Promise<UserModel> => {
    return await prisma.user.create({ ...params });
  }
};

export default UserRepository;
