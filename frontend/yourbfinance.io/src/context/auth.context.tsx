import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './user.context';
import Cookies from 'js-cookie'

interface UserContextProps {  
  isAuthenticated: boolean;
  verifyAuth: () => boolean;
}

export const AuthContext = createContext<UserContextProps>({
  isAuthenticated: false,
  verifyAuth: () => true || false
});

interface UserProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: UserProviderProps) => {
  const {isLogged} = useContext(UserContext)
  const navigate = useNavigate();

  const token = Cookies.get('AccessAuth')

  const verifyAuth = () => {

    

  }

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);
  




  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        verifyAuth: () => true || false
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}