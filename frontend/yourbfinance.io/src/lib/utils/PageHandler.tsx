import { useNavigate } from 'react-router-dom';
export const path = '/auth/';

const PageHandler = () => {
  const getActivePage = (): string | undefined => {
    const path = window.location.pathname;
    const pathSplit = path.split('/auth/');
    return pathSplit[1];
  };

  const navigate = useNavigate();

  const navigateTo = (page: string): void => {
    const pagePath = `${path}${page}`;
    navigate(`${pagePath || '/'}`);
  };
  return { getActivePage, path, navigateTo };
};

export default PageHandler;
