/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@chakra-ui/react';
import { gradient } from '../../constants/AppColors';

const PrimaryButton = (props: any) => {
  const {
    width,
    height,
    isDisabled,
    type,
    onClick,
    children,
    rightIcon,
    direction = 'ltr',
    fontWeight = 'hairline',
    ...rest
  } = props;

  return (
    <Button
      px={6}
      py={2}
      fontSize='sm'
      boxShadow='none'
      border='1px'
      bgGradient={gradient}
      _hover={{
        bgGradient: gradient,
        boxShadow: 'none',
      }}
      color='white'
      h={height}
      w={width}
      fontWeight={fontWeight}
      type={type}
      onClick={onClick}
      spinnerPlacement={'end'}
      {...rest}
      borderRadius='lg'
      rightIcon={rightIcon}
      lineHeight='1.3'
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
