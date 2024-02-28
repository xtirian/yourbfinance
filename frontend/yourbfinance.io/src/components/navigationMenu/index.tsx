import { PiSquaresFour } from 'react-icons/pi';
import { LuWallet } from 'react-icons/lu';
import { GoArrowSwitch } from 'react-icons/go';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PageHandler from '../../lib/utils/PageHandler';

const MenuNavegacaoComponente = () => {
  const SideBarTextProps = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFF',
    display: 'flex',
    gap: '12px',
    width: '100%',
    padding: '12px 16px',
  };

  const activePageProps = {
    backgroundColor: '#299D91',
    borderRadius: '4px',
  };

  const [activePage, setActivePage] = useState<string | undefined>(undefined);

  const { getActivePage, navigateTo } = PageHandler();

  useEffect(() => {
    if (getActivePage() !== activePage) {
      setActivePage(getActivePage);
    }
  }, [activePage, getActivePage]);

  if (activePage === undefined) return;

  return (
    <List spacing={'16px'}>
      <ListItem
        {...SideBarTextProps}
        {...(activePage === 'dashboard' ? activePageProps : {})}
        onClick={() => navigateTo('dashboard')}
      >
        <ListIcon as={PiSquaresFour} color={'#FFFFFF'} fontSize={'24px'} />
        Meu Painel
      </ListItem>
      <ListItem
        {...SideBarTextProps}
        {...(activePage === 'category' ? activePageProps : {})}
        onClick={() => navigateTo('category')}
      >
        <ListIcon as={LuWallet} color={'#FFFFFF'} fontSize={'24px'} />
        Categoria
      </ListItem>
      <ListItem
        {...SideBarTextProps}
        {...(activePage === 'extract' ? activePageProps : {})}
        onClick={() => navigateTo('extract')}
      >
        <ListIcon as={GoArrowSwitch} color={'#FFFFFF'} fontSize={'24px'} />
        Extrato
      </ListItem>
    </List>
  );
};

export default MenuNavegacaoComponente;
