/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  SubscriptionManagementLogo,
  LoginBanner,
} from '../../constants/ImageData';
import PrimaryButton from '../../components/common/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryInput from '../../components/common/PrimaryInput';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import useAuthStore from '../../store/auth.store';
import { Routes } from '../../constants/Routes';
import { showToast } from '../../util/toast.util';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppColors, gradient } from '../../constants/AppColors';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

const Login = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await authStore.onLogin({
        username: values.email.toLowerCase(),
        password: values.password,
      });
    } catch (error) {
      showToast(
        'Login Failed',
        'There was an issue in Login your account. Please try again.',
        'error',
      );
    }
  };

  useEffect(() => {
    if (
      !authStore.organizationInfo ||
      !Object.keys(authStore.organizationInfo).length
    ) {
      navigate(Routes.auth.findOrganization);
    }
  }, []);

  return (
    <Box width='100%'>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        h='100vh'
      >
        <GridItem display={{ base: 'none', md: 'block' }}>
          <Image
            src={LoginBanner}
            alt='login-banner'
            h='100vh'
            width='100%'
            objectFit='cover'
          />
        </GridItem>
        <GridItem className='login-bg'>
          <Flex direction='column' h='100%' justifyContent='space-between'>
            <Box></Box>
            <Stack spacing={6} mx={'auto'} w={{ base: '90%', md: 'sm' }}>
              <Stack align={'center'}>
                <Image
                  src={SubscriptionManagementLogo}
                  alt='logo'
                  width='40%'
                />
                <Heading fontSize={'5xl'} color='gray.900' mt={5}>
                  Welcome
                </Heading>
                <Text fontSize={'xl'} color={'gray.600'}>
                  Subscription Management
                </Text>
                <Text style={{ color: AppColors.primaryColor }} fontSize={'xl'}>
                  <span>Welcome to </span>{' '}
                  <b>{authStore.organizationInfo.organizationName}</b>
                </Text>
              </Stack>
              <Box>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleLogin}
                  validationSchema={validationSchema}
                >
                  {({ errors }) => (
                    <Form>
                      <Stack spacing={4}>
                        <FormControl id='email'>
                          <FormLabel mb={1}>Email</FormLabel>
                          <Field
                            as={PrimaryInput}
                            id='email'
                            name='email'
                            type='email'
                            placeholder={'Enter your email'}
                          />
                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.email}
                          </Text>
                        </FormControl>
                        <FormControl id='password'>
                          <FormLabel mb={1}>Password</FormLabel>
                          <Field name='password'>
                            {({ field }: any) => (
                              <PrimaryInput
                                {...field}
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder={'Enter your Password'}
                                rightIcon={
                                  <Box
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {showPassword ? (
                                      <FaEye fontSize='16px' color='gray' />
                                    ) : (
                                      <FaEyeSlash
                                        fontSize='16px'
                                        color='gray'
                                      />
                                    )}
                                  </Box>
                                }
                              />
                            )}
                          </Field>

                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.password}
                          </Text>
                        </FormControl>
                        <Stack spacing={4}>
                          <Flex justify={'space-between'} my={1}>
                            <Checkbox defaultChecked>Remember me</Checkbox>
                            <Text
                              fontSize='sm'
                              background={gradient}
                              backgroundClip='text'
                              color='transparent'
                              fontWeight='bold'
                            >
                              <Link to={Routes.auth.forgotPassword}>
                                Forgot password
                              </Link>
                            </Text>
                          </Flex>
                          <PrimaryButton
                            isLoading={authStore.isLoggingIn}
                            type='submit'
                            children={'SignIn'}
                          />

                          <Text>
                            Don't have an account?
                            <span
                              style={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                navigate(Routes.auth.signup);
                              }}
                            >
                              Sign up for SM
                            </span>
                          </Text>
                        </Stack>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
            <Box
              py={{ base: 4, md: 8 }}
              textAlign='end'
              pr={{ base: 6, md: 12 }}
            >
              <Text fontSize='sm' color='gray.500'>
                &copy; Subscription Management {new Date().getFullYear()}
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Login;
