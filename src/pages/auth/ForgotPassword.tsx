/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoKeyOutline } from 'react-icons/io5';
import PrimaryInput from '../../components/common/PrimaryInput';
import PrimaryButton from '../../components/common/PrimaryButton';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Routes } from '../../constants/Routes';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useAuthStore from '../../store/auth.store';


const initialValues = {
  email: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const authStore = useAuthStore();

  const handleSubmit = async () => {};

  function renderLoginStep() {
    return (
      <Flex justifyContent='center' px={4}>
        <Box boxSize='sm' mt={32}>
          <Stack align={'center'}>
            <Box
              p={3}
              borderRadius='xl'
              width='fit-content'
              bg='white'
              color='black'
              fontSize='28px'
            >
              {<IoKeyOutline />}
            </Box>
            <Heading fontSize={'5xl'} color='gray.900' mt={4}>
              Forgot password?
            </Heading>
            <Text fontSize={'xl'} color={'gray.600'}>
              No worries, we’ll send you reset instructions.
            </Text>
          </Stack>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Stack spacing={4} my={6}>
                <FormControl id='email'>
                  <FormLabel mb={1} fontSize='sm' fontWeight='bold'>
                    Email
                  </FormLabel>
                  <Field name='email'>
                    {({ field }: any) => (
                      <PrimaryInput
                        {...field}
                        bg='white'
                        id='email'
                        type='email'
                        placeholder={'Enter Your Email'}
                        _placeholder={{ color: 'gray.400' }}
                      />
                    )}
                  </Field>
                  <Box height='4px' textAlign='end' color='red' fontSize='xs'>
                    <ErrorMessage name='email' />
                  </Box>
                </FormControl>
                <PrimaryButton
                  isLoading={authStore.isLoading}
                  mt='2'
                  type='submit'
                  children={'Reset Password'}
                  direction='rtl'
                />
                <Link to='#'>
                  <Flex
                    display='flex'
                    alignItems='center'
                    gap={1}
                    color='gray.900'
                    justifyContent='center'
                    mt={4}
                  >
                    <IoMdArrowBack fontSize='18px' />
                    <Link to={Routes.auth.login}>
                      <Text>{'Back to login'}</Text>
                    </Link>
                  </Flex>
                </Link>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Flex>
    );
  }

  return (
    <Box w='100%' h='100vh' className='auth-bg'>
      {renderLoginStep()}
    </Box>
  );
};

export default ForgotPassword;
