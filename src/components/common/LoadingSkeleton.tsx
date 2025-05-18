import React from 'react';
import { Box, Skeleton, Text } from '@chakra-ui/react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <Box position='relative' height='40' width='100%' textAlign='center'>
      <Skeleton height='40' />
      <Text
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        color='gray.500'
        fontWeight='bold'
      >
        Loading...
      </Text>
    </Box>
  );
};
