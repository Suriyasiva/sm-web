import {
  Box,
  Text,
  Badge,
  Icon,
  HStack,
  Divider,
  useColorModeValue,
  Switch,
  useBoolean,
} from '@chakra-ui/react';
import {
  MdAccessTime,
  MdAutorenew,
  MdDateRange,
  MdVerifiedUser,
} from 'react-icons/md';
import subscriptionRepository from '../../repositories/tenant/subscriptions.repository';
import { format } from 'date-fns';
import { AppColors } from '../../constants/AppColors';

interface SubscriptionCardProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  subscriptionPlanId: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
  subscriptionStatus: 'FREEMIUM' | 'MONTHLY' | 'ANNUALLY' | string;
  startedAt: string;
  expiredAt: string;
  autoRenew: boolean;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  subscriptionPlan: {
    billingCycle: string;
    code: string;
    name: string;
    status: string;
    timePeriod: string;
    trialPeriodDays: string;
  };
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'green';
    case 'INACTIVE':
      return 'red';
    default:
      return 'gray';
  }
};

const SubscriptionCard = ({
  id,
  updatedAt,
  status,
  subscriptionStatus,
  startedAt,
  expiredAt,
  autoRenew,
  customer,
  subscriptionPlan,
}: SubscriptionCardProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const [isAutoRenewEnabled, iaState] = useBoolean(autoRenew);
  return (
    <Box
      key={id}
      borderRadius='lg'
      overflow='hidden'
      p={5}
      bg={bg}
      borderColor={borderColor}
    >
      <HStack align='start' spacing={3}>
        <HStack justify='space-between' w='100%'>
          <Text color={AppColors.primaryColor} fontSize='lg' fontWeight='bold'>
            Subscription
          </Text>
          <Box gap={5}>
            <HStack>
              <Text>Auto Renewal</Text>
              <Switch
                isChecked={isAutoRenewEnabled}
                onChange={() => {
                  // disable when updating autoRenew
                  iaState.toggle();
                  subscriptionRepository.toggleAutoRenew();
                }}
              />
            </HStack>
            <Box w={5} />
            <Badge colorScheme={getStatusColor(status)}>{status}</Badge>
          </Box>
        </HStack>
      </HStack>

      <Box mt={5} />
      <HStack alignItems={'start'} justifyContent={'space-between'}>
        <Box>
          <Text fontSize='sm' color='gray.500'>
            Plan: <b>{subscriptionPlan?.code}</b>
          </Text>
          <Text mt={2} fontSize='sm' color='gray.500'>
            Customer:{' '}
            <b>
              {customer?.firstName} {customer?.lastName}
            </b>
          </Text>
        </Box>

        <Box>
          <HStack spacing={3}>
            <Icon as={MdDateRange} color='gray.500' />
            <Text fontSize='sm'>
              <b>Started:</b> {new Date(startedAt).toLocaleDateString()}
            </Text>
          </HStack>
        </Box>

        <Box>
          <HStack spacing={3}>
            <Icon as={MdAccessTime} color='gray.500' />
            <Text fontSize='sm'>
              <b>Expires:</b> {new Date(expiredAt).toLocaleDateString()}
            </Text>
          </HStack>
        </Box>

        <Box>
          <HStack spacing={3}>
            <Icon as={MdAutorenew} color='gray.500' />
            <Text fontSize='sm'>
              <b>Auto Renew:</b> {autoRenew ? 'Enabled' : 'Disabled'}
            </Text>
          </HStack>
        </Box>

        <Box>
          <HStack spacing={3}>
            <Icon as={MdVerifiedUser} color='gray.500' />
            <b>Plan:</b>
            <Badge colorScheme='blue'>{subscriptionStatus}</Badge>
          </HStack>
        </Box>

        <Box>
          <HStack spacing={3}>
            <Icon as={MdDateRange} color='gray.500' />
            <Text fontSize='sm'>
              <b>Last Updated Subscription:</b>{' '}
              {updatedAt && format(new Date(updatedAt), 'dd-MM-yyyy')}
            </Text>
          </HStack>
        </Box>
      </HStack>
      <Box mt={5} />
      <Divider borderBottom={'2px solid gray'} />
    </Box>
  );
};

export default SubscriptionCard;
