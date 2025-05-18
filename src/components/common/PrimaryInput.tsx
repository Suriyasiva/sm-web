/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { AppColors } from '../../constants/AppColors';

const PrimaryInput = (props: PrimaryInputProps) => {
  const { placeholder, fontWeight, leftIcon, rightIcon, width, ...rest } =
    props;

  return (
    <InputGroup width={width}>
      {leftIcon && (
        <InputLeftElement
          pointerEvents='none'
          color='#EF6820'
          fontSize='1.2em'
          mt='1px'
        >
          {leftIcon}
        </InputLeftElement>
      )}
      <Input
        fontWeight={fontWeight}
        paddingLeft={leftIcon && 8}
        boxShadow='none'
        border='1px'
        borderColor='gray.300'
        _placeholder={{ color: 'gray.400' }}
        _hover={{
          boxShadow: '0 0 4px rgba(243, 135, 68, 0.6)',
          border: '1px solid #f38744',
        }}
        _focusVisible={{
          boxShadow: '0 0 4px rgba(243, 135, 68, 0.6)',
          border: '1px solid #f38744',
        }}
        h='44px'
        placeholder={placeholder}
        {...rest}
      />
      {rightIcon && (
        <InputRightElement
          width='10%'
          cursor='pointer'
          color={AppColors.primaryColor}
          fontSize='1em'
          mt='2px'
          right={3}
        >
          {rightIcon}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default PrimaryInput;

interface PrimaryInputProps {
  fontWeight?: string;
  placeholder?: string;
  width?: string;
  leftIcon?: ReactElement;
  [key: string]: any;
}
