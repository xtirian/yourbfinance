import { createContext, useState } from 'react';
import { UserModel } from '../lib/models/userModel';
import { signupApi } from '../lib/api/signup';

import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../lib/api';
import { login } from '../lib/api/login';
import { jwtDecode } from 'jwt-decode';

interface UserContextProps {
  isLogged: boolean;
  user: UserModel | null;
  signin: (data: UserModel) => Promise<boolean | undefined>;
  logout: () => void;
  signup: (data: UserModel) => Promise<boolean | undefined>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSignupLoading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  isLogged: false,
  signin: async () => false || true,
  logout: () => {},
  signup: async () => false || true,
  isLoading: false,
  setIsLoading: () => {},
  isSignupLoading: false,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);

  const toast = useToast();

  const logout = () => {
    try {
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      throw new Error('Error on logout');
    }
  };

  const signup = async (data: UserModel) => {
    try {
      setIsSignupLoading(true);
      const response = await signupApi(data);
      if (response instanceof Error) throw new Error();
      setIsSignupLoading(false);

      toast({
        title: 'Cadastro realizado',
        description: 'Cadastro com sucesso, faça login para continuar',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      return true;
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;

      setIsSignupLoading(false);
      toast({
        title: 'Erro ao cadastrar',
        description: response?.data?.message || 'Erro ao cadastrar',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
  };

  const signin = async (data: UserModel) => {
    try {
      const response = await login(data);
      if (response instanceof Error) throw new Error();

      const decoded = jwtDecode<UserModel>(response?.token as string);

      if (!decoded) throw new Error('Error on decode token');

      setUserData({ ...decoded as UserModel,
        avatar: response.avatar, });

      toast({
        title: 'Login realizado',
        description: 'Login realizado com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      return true;
    } catch (error) {
      const { response } = error as AxiosError<ErrorResponse>;

      setIsSignupLoading(false);
      toast({
        title: 'Erro ao logar',
        description:
          response?.data?.message || 'Não foi possível realizar o login',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
  };

  const setUserData = async (data: UserModel) => {
    setUser(data);
    console.log(data);
    setIsLogged(true);
  };

  // TODO: Criar contexto de cookies
  // TODO: Pegar dados de usuário codificados no cookie

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          isLogged,
          signin,
          logout,
          signup,
          isLoading: false,
          setIsLoading: () => {},
          isSignupLoading,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
