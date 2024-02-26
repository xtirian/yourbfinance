import { type Prisma } from '@prisma/client';
import { prisma } from '../config/index';
import { type UserModel } from '../model/user.model';

export class UserRepository {
  async findMany(params: Prisma.UserFindManyArgs): Promise<UserModel[]> {
    return await prisma.user.findMany({ ...params });
  }

  async findUnique(params: Prisma.UserFindUniqueArgs): Promise<UserModel | null> {
    return await prisma.user.findUnique({ ...params });
  }

  async findFirst(params: Prisma.UserFindFirstArgs): Promise<UserModel | null> {
    return await prisma.user.findFirst({ ...params });
  }

  async create(params: Prisma.UserCreateArgs): Promise<UserModel> {
    return await prisma.user.create({ ...params });
  }
}
