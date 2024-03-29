import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/global.scss';
import { ChakraProvider } from '@chakra-ui/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/user.context.tsx';
import LoginPagina from './pages/public/login/index.tsx';
import SignupPagina from './pages/public/signup/index.tsx';
import DashBoardPagina from './pages/auth/dashboard/index.tsx';
import AuthLayout from './pages/auth/layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPagina />,
  },
  {
    path: '/signup',
    element: <SignupPagina />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/dashboard',
        element: <DashBoardPagina />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
);
