import { api } from '.'
import { UserModel } from '../models/userModel'

export const login = async ({
  email,
  password,
}: UserModel): Promise<LoginResponse> => {
  return (await api.post(`/user/login`, { email, password })).data;
};


type LoginResponse = {
  token: string | undefined;
  avatar: string | null;
};