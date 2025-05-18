/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
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
import { useNavigate } from 'react-router-dom';
import PrimaryInput from '../../components/common/PrimaryInput';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import useAuthStore from '../../store/auth.store';
import { Routes } from '../../constants/Routes';

const initialValues = {
  orgCode: '',
};

const validationSchema = yup.object({
  orgCode: yup.string().required('Organization Code is required'),
});

const SelectedOrganization = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const findOrganization = async (values: { orgCode: string }) => {
    await authStore.findOrganization(values.orgCode).then(() => {
      navigate(Routes.auth.login);
    });
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
                  Subscription Management
                </Text>
              </Stack>
              <Box>
                <Formik
                  initialValues={initialValues}
                  onSubmit={findOrganization}
                  validationSchema={validationSchema}
                >
                  {({ errors }) => (
                    <Form>
                      <Stack spacing={4}>
                        <FormControl id='orgCode'>
                          <FormLabel mb={1}>Organization Code</FormLabel>
                          <Field
                            as={PrimaryInput}
                            id='orgCode'
                            name='orgCode'
                            type='text'
                            placeholder={'Enter your Organization Code'}
                          />
                          <Text
                            color='red.500'
                            textAlign='end'
                            fontSize='sm'
                            h='10px'
                          >
                            {errors.orgCode}
                          </Text>
                        </FormControl>
                        <Stack spacing={4}>
                          <PrimaryButton
                            isLoading={authStore.isLoggingIn}
                            type='submit'
                            children={'Find Organization'}
                          />

                          <Text>
                            Don't have an organization?
                            <span
                              style={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                navigate(Routes.auth.createOrganization);
                              }}
                            >
                              Create Organization
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

export default SelectedOrganization;
