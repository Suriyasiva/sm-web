import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Spinner,
  Badge,
  HStack,
  Icon,
  Text,
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react';
import useSubscriptionPlansStore from '../../store/tenant/subscriptionPlans.store';
import { useEffect } from 'react';
import {
  MdAccessTime,
  MdArrowRightAlt,
  MdCheckCircle,
  MdWarning,
} from 'react-icons/md';
import useCustomerStore from '../../store/tenant/customer.store';
import SubscriptionCard from '../../components/common/SubscriptionCard';
import { format } from 'date-fns';
import PaymentTransactions from '../../components/common/PaymentTransactions';
import { NoDataFound } from '../../components/common/NoDataFound';
import { AppColors } from '../../constants/AppColors';
import useAuthStore from '../../store/auth.store';

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <MdCheckCircle color='green' />;
    case 'INACTIVE':
      return <MdWarning color='red' />;
    default:
      return <MdAccessTime color='gray' />;
  }
};

function Dashboard() {
  const subscriptionPlansStore = useSubscriptionPlansStore();
  const customerStore = useCustomerStore();
  const authStore = useAuthStore();

  useEffect(() => {
    subscriptionPlansStore.getCustomerSubscriptionHistory();
    customerStore.getCustomerSubscription();
    customerStore.getPaymentTransactions();
  }, []);

  return (
    <>
      <Box p={5} />

      <VStack p={4} w='100%'>
        <Heading>Organization Info</Heading>
        <Text color={AppColors.primaryColor} fontSize='lg' fontWeight='bold'>
          Organization Name: {authStore?.organizationInfo?.organizationName}
        </Text>
        <Text color={AppColors.primaryColor} fontSize='lg' fontWeight='bold'>
          Organization Code: {authStore?.organizationInfo?.organizationCode}
        </Text>
      </VStack>

      {!customerStore.isFetchingSubscription ? (
        <SubscriptionCard {...customerStore.customerSubscription} />
      ) : (
        <></>
      )}

      {subscriptionPlansStore.isFetchingSubscriptionHistory ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <HStack p={4} align='start' spacing={3}>
            <HStack justify='space-between' w='100%'>
              <Text
                color={AppColors.primaryColor}
                fontSize='lg'
                fontWeight='bold'
              >
                Subscription History
              </Text>
            </HStack>
          </HStack>
          <TableContainer p={4}>
            <Table variant='simple' colorScheme='gray'>
              <Thead bg='gray.100'>
                <Tr>
                  <Th>Transition</Th>
                  <Th>Status</Th>
                  <Th>Subscription Status</Th>
                  <Th>Current Subscription</Th>
                  <Th>Subscribed At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subscriptionPlansStore.customerSubscriptionHistory.map(
                  (entry) => (
                    <Tr key={entry.id}>
                      <Td>
                        <HStack spacing={2}>
                          <Badge colorScheme='purple'>{entry.fromStatus}</Badge>
                          <Icon as={MdArrowRightAlt} boxSize={5} />
                          <Badge colorScheme='blue'>{entry.toStatus}</Badge>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          {getStatusIcon(entry.status)}
                          <Text
                            fontWeight={'bold'}
                            color={getStatusColor(entry.status)}
                          >
                            {entry.status}
                          </Text>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={getStatusColor(entry.subscriptionStatus)}
                        >
                          {entry.subscriptionStatus}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme='blue'>{entry.toStatus}</Badge>
                      </Td>
                      <Td>
                        <Text fontSize='sm' color='gray.600'>
                          {format(new Date(entry.createdAt), 'dd-MM-yyyy')}
                        </Text>
                      </Td>
                    </Tr>
                  ),
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}

      {customerStore.isFetchingPaymentTransactions ? (
        <Center>
          <Spinner />
        </Center>
      ) : customerStore.customerPaymentTransactions.length ? (
        <>
          <HStack p={4} align='start' spacing={3}>
            <HStack justify='space-between' w='100%'>
              <Text
                color={AppColors.primaryColor}
                fontSize='lg'
                fontWeight='bold'
              >
                Payment Transaction History
              </Text>
            </HStack>
          </HStack>
          <PaymentTransactions
            data={customerStore.customerPaymentTransactions}
          />
        </>
      ) : (
        <>
          <HStack p={4} align='start' spacing={3}>
            <HStack justify='space-between' w='100%'>
              <Text
                color={AppColors.primaryColor}
                fontSize='lg'
                fontWeight='bold'
              >
                Payment Transaction History
              </Text>
            </HStack>
          </HStack>
          <NoDataFound />
        </>
      )}
    </>
  );
}

export default Dashboard;
