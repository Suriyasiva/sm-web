import { useState } from 'react';

import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { showToast } from '../../util/toast.util';
import {
  Stack,
  FormControl,
  FormLabel,
  Text,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PrimaryButton from '../../components/common/PrimaryButton';
import PrimaryInput from '../../components/common/PrimaryInput';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../constants/Routes';
import {
  LoginBanner,
  SubscriptionManagementLogo,
} from '../../constants/ImageData';
import useAuthStore from '../../store/auth.store';
import { ICreateTenant } from '../../store/super_admin/interface';

const initialCreateCustomerValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organizationName: '',
  domain: Date.now().toString() + 'suriya.org.in',
};
const validationSchemaForCustomer = yup.object({
  firstName: yup.string().required('First Name is required'),

  lastName: yup.string().required('Last Name is required'),

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

  organizationName: yup.string().required('Organization Name is required'),
});

function CreateOrganization() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const authStore = useAuthStore();
  const handleCreateUser = async (values: ICreateTenant) => {
    try {
      await authStore.createTenant(values);
      navigate(Routes.auth.findOrganization);
    } catch (error) {
      showToast(
        'Create Organization Failed',
        'There was an issue in Create a account. Please try again.',
        'error',
      );
    }
  };

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
                  Subscription Management <b>Create Organization</b>
                </Text>
              </Stack>
              <Box>
                <Formik
                  initialValues={initialCreateCustomerValues}
                  onSubmit={handleCreateUser}
                  validationSchema={validationSchemaForCustomer}
                >
                  {({ errors }) => (
                    <Form>
                      <Stack spacing={4}>
                        <FormControl id='firstName'>
                          <FormLabel mb={1}>First Name</FormLabel>
                          <Field
                            as={PrimaryInput}
                            id='firstName'
                            name='firstName'
                            type='text'
                            placeholder={'Enter your First Name'}
                          />
                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.firstName}
                          </Text>
                        </FormControl>

                        <FormControl id='lastName'>
                          <FormLabel mb={1}>Last Name</FormLabel>
                          <Field
                            as={PrimaryInput}
                            id='lastName'
                            name='lastName'
                            type='text'
                            placeholder={'Enter your Last Name'}
                          />
                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.lastName}
                          </Text>
                        </FormControl>

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

                        <FormControl id='email'>
                          <FormLabel mb={1}>Organization Name</FormLabel>
                          <Field
                            as={PrimaryInput}
                            id='organizationName'
                            name='organizationName'
                            type='text'
                            placeholder={'Enter your Organization Name'}
                          />
                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.organizationName}
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
                          <PrimaryButton
                            isLoading={authStore.isCreatingTenant}
                            type='submit'
                            children={'Create User'}
                          />

                          <Text>
                            Already having organization?
                            <span
                              style={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                navigate(Routes.auth.findOrganization);
                              }}
                            >
                              find organization
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
}

export default CreateOrganization;
