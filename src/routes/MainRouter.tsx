import { RouterProvider } from 'react-router-dom';
import useAuthStore, { AuthState } from '../store/auth.store';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import rootRouter from './RootRouter';

const MainRouter = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    authStore.lookupUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    authStore.authState === AuthState.isDeterming ||
    authStore.isDetermining
  ) {
    return (
      <Center w='full' gap={4}>
        <Spinner />
        <Text fontSize='20' fontWeight='bold'>
          Loading...
        </Text>
      </Center>
    );
  }

  return (
    <RouterProvider
      router={rootRouter}
      fallbackElement={<span>Determining...</span>}
    />
  );
};

export default MainRouter;
