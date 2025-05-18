import { Box, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';
import { gradient } from '../../constants/AppColors';

// TODO: move the file to src/components folder

interface NavItemProps extends FlexProps {
  icon?: IconType;
  label: ReactNode;
  route: string;
  parentRoute: string;
}

const NavItem = ({
  icon,
  label,
  route,
  parentRoute,
  ...rest
}: NavItemProps) => {
  const location = useLocation();
  const path = location.pathname;
  const basePath = '/' + path.split('/').slice(1, 3).join('/');
  const isSelected = basePath === parentRoute;

  return (
    <Box py={0.5}>
      <Box>
        <Link to={route}>
          <Flex
            align='center'
            py={2}
            px={3}
            mx={{ base: '2', md: '3' }}
            borderRadius='md'
            role='group'
            transition='background 0.3s ease-in-out'
            _hover={{
              transition: 'background 0.3s ease-in-out',
              bg: gradient,
            }}
            bg={
              isSelected
                ? gradient
                : 'inherit'
            }
            cursor='pointer'
            {...rest}
          >
            {icon && (
              <Icon
                mr='3.5'
                fontSize='22'
                color={'#712AA8'}
                _groupHover={{
                  color: '#712AA8',
                }}
                as={icon}
              />
            )}
            <Text
              mt={0.5}
              color={'#712AA8'}
              fontWeight='bold'
              bg={'#712AA8'}
              backgroundClip={'text'}
              _groupHover={{
                bg: '#712AA8',
                backgroundClip: 'text',
              }}
            >
              {label}
            </Text>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
};

export default NavItem;
