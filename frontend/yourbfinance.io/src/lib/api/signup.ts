import { api } from '.';
import { UserModel } from '../models/userModel';

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


