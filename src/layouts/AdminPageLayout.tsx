import {
  Box,
  BoxProps,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Heading,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import { IconType } from 'react-icons';
import { FiMenu } from 'react-icons/fi';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { Routes } from '../constants/Routes';
import useAuthStore from '../store/auth.store';
import NavItem from './components/NavItem';
import { GoPerson } from 'react-icons/go';
import { AppColors } from '../constants/AppColors';

const sideBarItems: Array<LinkItemProps> = [
  {
    name: 'Dashboard',
    icon: HiOutlineChartSquareBar,
    route: Routes.admin.dashboard,
    parentRoute: Routes.admin.dashboard,
  },
  {
    name: 'Subscriptions Plans',
    icon: GoPerson,
    route: Routes.admin.staffs,
    parentRoute: Routes.admin.staffs,
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    authStore.logout();
    navigate(Routes.auth.findOrganization, { replace: true });
  }

  return (
    <Box
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 72 }}
      pos='fixed'
      h='full'
      overflowY='scroll'
      css={{
        '&::-webkit-scrollbar': { width: '2px' },
        '&::-webkit-scrollbar-track': { background: '#fff' },
        '&::-webkit-scrollbar-thumb': { background: '#888' },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
      {...rest}
    >
      <Flex flexDirection='column' h='full'>
        <Flex
          alignItems='center'
          px={4}
          justifyContent={{ base: 'space-between', md: 'center' }}
        >
          <CloseButton
            boxShadow='none'
            mb={6}
            color='gray.700'
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        <Center p={4}>
          <Heading color={AppColors.primaryColor}>{authStore?.organizationInfo?.organizationName}</Heading>
        </Center>

        {sideBarItems.map((link) => (
          <NavItem
            parentRoute={link.parentRoute}
            // hasTemple={true}
            key={link.name}
            route={link.route}
            icon={link.icon}
            // dropdownItems={link.children}
            // subLinks={link.subLinks}
            label={link.name}
          />
        ))}

        <Box mt='auto' px='5'>
          <Flex py='6' borderTop='1px' borderColor='gray.200'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Box>
                <Heading size='sm'>
                  {authStore.currentUser?.firstName}{' '}
                  {authStore.currentUser?.lastName}
                </Heading>
                <Text>{authStore.currentUser?.email}</Text>
              </Box>
            </Flex>
            <Box textAlign='center' cursor='pointer'>
              <Icon as={LuLogOut} onClick={handleLogout} fontSize='18px' />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='space-between'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<FiMenu />}
      />
    </Flex>
  );
};

const AdminPageLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' w='100%'>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 72 }}>
        <Box position='relative'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPageLayout;

export interface LinkItemProps {
  name: string;
  icon?: IconType;
  route: string;
  subLinks?: string[];
  parentRoute: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
