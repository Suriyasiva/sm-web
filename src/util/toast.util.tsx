import {
  createStandaloneToast,
  AlertStatus,
  Box,
  Flex,
  Spacer,
  Text,
  Image,
} from '@chakra-ui/react';
import { IoMdClose } from 'react-icons/io';
import { ErrorToastIcon, SuccessToastIcon } from '../constants/ImageData';
import { STATUS } from '../constants/AppLayout';

export function showToast(
  title: string,
  message: string | JSX.Element,
  status: AlertStatus,
  duration: number = 2000,
) {
  const { toast } = createStandaloneToast();
  toast({
    position: 'bottom-right',
    duration: duration,
    render: ({ onClose }) => (
      <Box color='black' p='2' bg='white' borderRadius='lg'>
        <Flex justifyContent='center'>
          <Box>
            {status === STATUS.ERROR ? (
              <Image src={ErrorToastIcon} alt='error-icon' />
            ) : (
              <Image src={SuccessToastIcon} alt='success-icon' />
            )}
          </Box>
          <Spacer />
          <Box alignSelf='center'>
            <IoMdClose
              onClick={() => onClose()}
              fontSize='22px'
              color='gray'
              cursor='pointer'
            />
          </Box>
        </Flex>
        <Box px='3'>
          <Text fontSize='lg' fontWeight='600'>
            {title}
          </Text>
          <Text fontWeight='400'>{message}</Text>
        </Box>
      </Box>
    ),
  });
}
