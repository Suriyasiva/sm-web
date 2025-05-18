/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import React, { ReactElement } from 'react';
import { AppColors } from '../../constants/AppColors';
import { MdOutlinePendingActions } from 'react-icons/md';

const FormInput: React.FC<IProps> = (props: IProps) => {
  const {
    placeholder,
    fontWeight,
    addonText,
    leftIcon,
    rightIcon,
    width,
    onValueChange,
    isEdited,
    ...rest
  } = props;
  return (
    <Field name={props.name}>
      {({ field }: FieldProps) => {
        return (
          <Box position='relative'>
            {isEdited && (
              <Flex
                position='absolute'
                bottom='50px'
                right='0'
                zIndex='1'
              >
                <MdOutlinePendingActions fontSize='18px' />
              </Flex>
            )}

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
              {addonText && (
                <InputLeftAddon
                  borderLeftRadius='md'
                  bg='white'
                  border='1px'
                  borderColor='gray.300'
                  borderRight={0}
                  fontSize='lg'
                  color='gray.600'
                >
                  {addonText}
                </InputLeftAddon>
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
                h='40px'
                placeholder={placeholder}
                {...rest}
                {...field}
                {...(onValueChange && { onChange: onValueChange })}
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
            <Box
              display={'flex'}
              justifyContent={'end'}
              color={props.errorColor || 'red'}
              mt={1}
              fontSize='xs'
            >
              <ErrorMessage name={props.name ?? ''} />
            </Box>
          </Box>
        );
      }}
    </Field>
  );
};

export default FormInput;

interface IProps {
  fontWeight?: string;
  placeholder?: string;
  width?: string;
  leftIcon?: ReactElement;
  [key: string]: any;
  name?: string;
  addonText?: string;
  onValueChange?: (e: any) => void;
  errorColor?: string;
  isEdited?: boolean;
}
