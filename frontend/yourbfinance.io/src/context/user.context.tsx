import { createContext, useState } from 'react';
import { UserModel } from '../lib/models/userModel';
import { signupApi } from '../lib/api/signup';

import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../lib/api';

interface UserContextProps {
  isLogged: boolean;
  user: UserModel | null;
  signin: (data: UserModel) => Promise<void>;
  logout: () => void;
  signup: (data: UserModel) => Promise<boolean | undefined>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSignupLoading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  isLogged: false,
  signin: async () => {},
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

  // TODO: Criar contexto de cookies
  // TODO: Pegar dados de usuário codificados no cookie

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          isLogged,
          signin: () => Promise.resolve(),
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
