import { api } from '.';
import { UserModel } from '../models/userModel';

type GetByIdParams = { id: number };

export const login = async ({
  email,
  password,
}: UserModel): Promise<UserModel> => {
  return (await api.post(`/user/login`, { email, password })).data;
};

export const signupApi = async ({
  email,
  name,
  last_name,
  password,
}: UserModel) => {
  const response = (
    await api.post('/user/signup', { email, name, last_name, password })
  ).data;
  return response;
};

export const get = async ({ id }: GetByIdParams): Promise<UserModel> => {
  return (await api.get(`/user/${id}`)).data;
};
