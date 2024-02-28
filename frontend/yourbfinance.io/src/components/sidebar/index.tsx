import { Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './sidebar.scss';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useScreenSize } from '../../lib/utils/WindowSizeHandler';
import MenuNavegacaoComponente from '../navigationMenu';

const SideBar = () => {
  const screenSize = useScreenSize();
  const { isOpen, toggle, setIsOpen } = useSideBar();

  useEffect(() => {
    if (screenSize.width > 768) {
      setIsOpen(true);
    }
    if (screenSize.width < 768) {
      setIsOpen(false);
    }
  }, [screenSize.width, setIsOpen]);

  return (
    <>
      <Flex
        direction={'column'}
        maxW={'280px'}
        height={'100vh'}
        paddingTop={'48px'}
        className={`sideBar_container ${isOpen ? 'open' : 'close'}`}
      >
        <Image
          src={'/logo2.svg'}
          alt={'logo'}
          alignSelf={'center'}
          maxW={'100%'}
          maxH={'32px'}
          mb={'40px'}
        />
        <MenuNavegacaoComponente />
        <IoMdClose onClick={toggle} className="sideBar_Icon close" />
      </Flex>
      <Flex display={!isOpen ? 'flex' : 'none'}>
        <FiMenu onClick={toggle} className={`sideBar_Icon`} />
      </Flex>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, toggle, setIsOpen };
};

export default SideBar;
