/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { gradient } from '../../constants/AppColors';

const GradientButton = (props: GradientButtonProps) => {
  const { onClick, children, ...rest } = props;
  return (
    <Button
      py={2}
      fontSize='sm'
      boxShadow='none'
      border='1px'
      borderColor='#F3B33E'
      background={gradient}
      _hover={{
        bgGradient: { gradient },
        boxShadow: 'none',
      }}
      color='white'
      borderRadius='lg'
      lineHeight='1.3'
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default GradientButton;

interface GradientButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  [key: string]: any;
}
