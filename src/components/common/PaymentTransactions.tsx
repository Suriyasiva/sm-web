import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FiCreditCard, FiRefreshCw } from 'react-icons/fi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ISubscriptionTransaction } from '../../types';

interface Props {
  data: ISubscriptionTransaction[];
}

const SubscriptionTransactionTable = ({ data }: Props) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CREDIT':
        return <FiCreditCard />;
      case 'REFUND':
        return <FiRefreshCw />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const color =
      status === 'SUCCESS' ? 'green' : status === 'FAILED' ? 'red' : 'yellow';
    const Icon = status === 'SUCCESS' ? FaCheckCircle : FaTimesCircle;
    return (
      <Badge colorScheme={color} display='flex' alignItems='center' gap={1}>
        <Icon />
        {status}
      </Badge>
    );
  };

  const renderMetaData = (metaData: ISubscriptionTransaction['metaData']) => {
    if (
      typeof metaData === 'object' &&
      'usedAmount' in metaData &&
      'payableAmount' in metaData &&
      'remainingAmount' in metaData
    ) {
      return (
        <VStack align='start' spacing={0}>
          <Text>
            <b style={{ color: 'gray.100' }}>Used in previous subscription:</b>{' '}
            ${metaData.usedAmount}
          </Text>
          <Text>
            <b>Paid:</b> ${metaData.payableAmount}
          </Text>
          <Text>
            <b>Remaining amount in previous subscription:</b> $
            {metaData.remainingAmount}
          </Text>
        </VStack>
      );
    }

    return (
      <VStack align='start' spacing={0}>
        {Object.entries(metaData).map(([key, value]) => (
          <Text key={key}>
            {key}: {value}
          </Text>
        ))}
      </VStack>
    );
  };

  const getPlanColor = (code: string) => {
    switch (code) {
      case 'FREEMIUM':
        return 'gray';
      case 'MONTHLY_BASIC':
        return 'blue';
      case 'ANNUAL_PREMIUM':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <Box p={4} borderRadius='lg' overflowX='auto'>
      <Table variant='simple' colorScheme='gray'>
        <Thead bg='gray.100'>
          <Tr>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th>Amount</Th>
            <Th>Created At</Th>
            <Th>Plan</Th>
            <Th>Metadata</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((txn) => (
            <Tr key={txn.id}>
              <Td>
                <HStack>
                  {getTypeIcon(txn.type)}
                  <Text>{txn.type}</Text>
                </HStack>
              </Td>
              <Td>{getStatusBadge(txn.status)}</Td>
              <Td>${txn.amount}</Td>
              <Td>{new Date(txn.createdAt).toLocaleString()}</Td>
              <Td>
                <Badge colorScheme={getPlanColor(txn.subscriptionPlan.code)}>
                  {txn.subscriptionPlan.code}
                </Badge>
              </Td>
              <Td>{renderMetaData(txn.metaData)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SubscriptionTransactionTable;
