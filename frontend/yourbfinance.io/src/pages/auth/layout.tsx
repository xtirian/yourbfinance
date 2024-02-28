import SideBar from '../../components/sidebar';
import { Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../context/auth.context';
import { useContext } from 'react';

const AuthLayout = () => {
  //const {  } = useContext(AuthContext);
  return (
    <AuthProvider>
      <SideBar />
      <Outlet />
    </AuthProvider>
  );
};

export default AuthLayout;
